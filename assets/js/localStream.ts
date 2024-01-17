// Video stream
let localStream;

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
