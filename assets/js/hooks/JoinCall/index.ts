import { initLocalStream } from "../../localStream";

export default {
  async mounted() {
    const stream = await initLocalStream({audio: true, video: true, width: "1280"})
    document.getElementById("local-video").srcObject = stream;
  }
}
