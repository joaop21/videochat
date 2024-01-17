import { createPeerConnection } from "../../users";

export default {
  mounted () {
    const data = this.el.dataset;
    const fromUser = data.fromUserUuid;
    const sdp = data.sdp;

    if (sdp != "") {
      console.log("new sdp OFFER from", data.fromUserUuid, data.sdp);

      createPeerConnection(this, fromUser, sdp);
    }
  }
}
