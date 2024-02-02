import { ViewHook } from "phoenix_live_view";
import { createPeerConnection } from "../../users";

export default {
  mounted () {
    console.log("new offer request from", this.el.dataset.fromUserUuid)
    const fromUser = this.el.dataset.fromUserUuid!;
    createPeerConnection(this, fromUser)
  }
} as ViewHook;
