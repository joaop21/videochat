import { ViewHook } from "phoenix_live_view"
import { getUserConnection } from "../../users";

export default {
  mounted () {
    const data = this.el.dataset;
    const fromUser = data.fromUserUuid!;
    const sdp = data.sdp;
    const peerConnection = getUserConnection(fromUser).peerConnection;

    if (sdp != "" && peerConnection) {
      console.log("new sdp ANSWER from", fromUser, sdp);
      peerConnection.setRemoteDescription({type: "answer", sdp: sdp});
    }
  }
} as ViewHook;
