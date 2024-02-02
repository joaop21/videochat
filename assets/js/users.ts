import { ViewHook } from "phoenix_live_view";
import { getLocalStream } from "./localStream";

type Connection = {
  peerConnection: RTCPeerConnection | null;
}

const users: Record<string, Connection> = {};

export function addUserConnection(userUuid: string) {
  if (!users[userUuid]) {
    users[userUuid] = {
      peerConnection: null
    }
  }

  console.log(users);

  return users;
}

export function removeUserConnection(userUuid: string) {
  delete users[userUuid];

  return users;
}

export function getUserConnection(userUuid: string) {
  return users[userUuid];
}

// lv       - Our LiveView hook's `this` object
// fromUser - The user to create the peer connection with
// offer    - Stores an SDP offer if it was passed to the function
export function createPeerConnection(lv: ViewHook, fromUser: string, offer?: string) {
  const newPeerConnection = new RTCPeerConnection({
    iceServers: [
      // Using a public STUN server for now
      { urls: "stun:74.125.192.127" }
    ]
  })

  // Add this new peer connection to our `users` object.
  users[fromUser].peerConnection = newPeerConnection;

  const localStream = getLocalStream();

  // Add each local track to the RTCPeerConnection.
  localStream
    .getTracks()
    .forEach(track => newPeerConnection.addTrack(track, localStream))

  // If creating an answer, rather than an initial offer.
  if (offer !== undefined) {
    newPeerConnection.setRemoteDescription({type: "offer", sdp: offer})
    newPeerConnection.createAnswer()
      .then((answer) => {
        newPeerConnection.setLocalDescription(answer)
        console.log("Sending this ANSWER to the requester:", answer)
        lv.pushEvent("new_answer", {toUser: fromUser, description: answer})
      })
      .catch((err) => console.log(err))
  }

  newPeerConnection.onicecandidate = async ({candidate}) => {
    // fromUser is the new value for toUser because we're sending this data back
    // to the sender
    lv.pushEvent("new_ice_candidate", {toUser: fromUser, candidate})
  }

  // Don't add the `onnegotiationneeded` callback when creating an answer due to
  // a bug in Chrome's implementation of WebRTC.
  if (offer === undefined) {
    newPeerConnection.onnegotiationneeded = async () => {
      try {
        newPeerConnection.createOffer()
          .then((offer) => {
            newPeerConnection.setLocalDescription(offer)
            console.log("Sending this OFFER to the requester:", offer)
            lv.pushEvent("new_sdp_offer", {toUser: fromUser, description: offer})
          })
          .catch((err) => console.log(err))
      }
      catch (error) {
        console.log(error)
      }
    }
  }

  // When the data is ready to flow, add it to the correct video.
  newPeerConnection.ontrack = async (event) => {
    console.log("Track received:", event)

    const mediaElement = document.getElementById(`video-remote-${fromUser}`)! as HTMLMediaElement;
    mediaElement.srcObject = event.streams[0]
  }

  return newPeerConnection;
}
