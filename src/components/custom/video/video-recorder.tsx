"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { getSignedUrlVideo, uploadVideo as upload } from "@/app/actions/videos";
import { getUserLoggedIn } from "@/app/actions/users";
import { Button } from "@/components/ui/button";
import {
  Download,
  Loader2,
  Play,
  Podcast,
  Send,
  StopCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function VideoRecorder() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const initialize = useCallback(() => {
    if (!navigator.mediaDevices) return <p>getUserMedia not supported</p>;
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startCountdown = () => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(interval);
          startRecord();
          return null;
        }
        return prevCount ? prevCount - 1 : null;
      });
    }, 1000);
  };

  const startStreaming = async (): Promise<void> => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(userStream);
      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const stopStreaming = (): void => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const startRecord = (): void => {
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
      setRecorder(mediaRecorder);
      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
    } else {
      console.error("No stream available for recording.");
    }
  };

  const stopRecord = (): void => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  };

  const uploadVideo = async () => {
    setIsUploading(true);

    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const file = new File([blob], `video-${Date.now()}.webm`, {
        type: "video/webm",
      });

      try {
        const { user } = await getUserLoggedIn();
        if (!user) return;

        await upload(user?.id, file);

        const signedUrl = await getSignedUrlVideo(user.id, file.name);

        if (signedUrl) setVideoUrl(signedUrl);
      } catch (error) {
        console.error("Error uploading video:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div>
      <div className="w-full max-w-2xl aspect-video rounded-lg flex justify-center items-center overflow-hidden relative bg-secondary border ring-1 ring-offset-2 ring-gray-200">
        {countdown && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-6xl font-bold text-white text-center">
              {countdown}
            </span>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex gap-2 justify-center p-4">
        {stream?.active ? (
          <Button variant={"destructive"} onClick={stopStreaming}>
            <span className="animate-pulse">Stop Streaming</span>
          </Button>
        ) : (
          <Button onClick={startStreaming}>
            <Podcast className="mr-2 h-4 w-4" />
            Start Streaming
          </Button>
        )}
        {recorder?.state === "recording" ? (
          <Button variant={"destructive"} onClick={stopRecord}>
            <StopCircleIcon className="mr-2 h-4 w-4" />
            <span className="animate-pulse">Stop Recording</span>
          </Button>
        ) : (
          <Button
            onClick={startCountdown}
            className={cn(stream === null ? "hidden" : "flex gap-2")}
          >
            <Play className="h-4 w-4" /> Start Recording
          </Button>
        )}

        {recordedChunks.length > 0 && (
          <Button variant={"secondary"} onClick={uploadVideo}>
            {isUploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {isUploading ? "Uploading..." : "Send Video"}
          </Button>
        )}
        {videoUrl && (
          <Button variant="outline" asChild>
            <Link href={videoUrl}>
              <Download className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export { VideoRecorder };
