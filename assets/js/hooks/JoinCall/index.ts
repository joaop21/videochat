import { ViewHook } from "phoenix_live_view";
import { initLocalStream } from "../../localStream";

async function doMounted() {
  const stream = await initLocalStream({audio: true, video: true, width: "1280"})
  const mediaElement = document.getElementById("local-video")! as HTMLMediaElement;
  mediaElement.srcObject = stream!;
};

export default {
  mounted() {
    doMounted();
  }
} as ViewHook;
