import { getUserConnection } from "../../users";

export default {
  mounted () {
    const data = this.el.dataset;
    const fromUser = data.fromUserUuid;
    const iceCandidate = JSON.parse(data.iceCandidate);
    const peerConnection = getUserConnection(fromUser).peerConnection;

    console.log("new ice candidate from", fromUser, iceCandidate)

    peerConnection.addIceCandidate(iceCandidate);
  }
}
