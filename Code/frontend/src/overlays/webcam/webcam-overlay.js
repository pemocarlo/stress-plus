import React, {useRef, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import "./webcam-overlay.scss";

const mediaConstraints = {
  video: true,
  audio: false,
};

function isLoading(videoRef, videoStream) {
  return videoRef.current === null || videoStream === undefined;
}

function getWebCamStream() {
  if (!navigator.mediaDevices) {
    return Promise.reject(new Error("WebRTC not supported or enabled"));
  } else {
    return navigator.mediaDevices.getUserMedia(mediaConstraints);
  }
}

export default function WebcamOverlay() {
  const {t} = useTranslation();
  const videoRef = useRef(null);
  const [videoStream, setVideoStream] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (!isLoading(videoRef, videoStream)) {
      return;
    }
    getWebCamStream().then(
      (videoStream) => {
        setVideoStream(videoStream);
        setError(undefined);
      },
      (error) => {
        console.warn(`Webcam loading error: ${error}`);
        setVideoStream(undefined);
        setError(error);
      }
    );
  }, [videoRef, videoStream]);

  useEffect(() => {
    if (isLoading(videoRef, videoStream)) {
      return;
    }
    videoRef.current.srcObject = videoStream;
    return () => videoStream.getTracks().forEach((track) => track.stop());
  }, [videoRef, videoStream]);

  const message = error
    ? t("editor.overlay.items.webcam.error")
    : isLoading(videoRef, videoStream)
    ? t("editor.overlay.items.webcam.loading")
    : "";

  return (
    <div className="webcam-container">
      <video ref={videoRef} className="webcam" autoPlay playsInline controls={false} />
      <div className="message">{message}</div>
    </div>
  );
}
