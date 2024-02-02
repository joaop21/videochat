// Video stream
let localStream: Awaited<ReturnType<typeof navigator.mediaDevices.getUserMedia>>;

type StreamParams = {
  audio: boolean;
  video: boolean;
  width: string;
}

export async function initLocalStream(params: StreamParams) {
  try {
    localStream = await navigator.mediaDevices.getUserMedia(params);
    return localStream;
  } catch (e) {
    console.log(e);
  }
}

export function getLocalStream() {
  return localStream;
}
