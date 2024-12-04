"use client";

import { VideoWithSignedUrl } from "@/app/@types";
import {
  deleteVideo,
  // getVideo
} from "@/app/actions/videos";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { User } from "@supabase/supabase-js";
import { TrashIcon } from "lucide-react";
// import { useEffect, useState } from "react";

function VideoCard({ video, user }: { video: VideoWithSignedUrl; user: User }) {
  // const [info, setInfo] = useState({});

  // async function videoInfo(video: VideoWithSignedUrl) {
  //   const data = await getVideo(user?.id, video.name);

  //   return data;
  // }

  // useEffect(() => {
  //   const info = videoInfo(video);
  //   setInfo(info);
  // }, []);

  async function handleDelete(video: VideoWithSignedUrl) {
    const data = await deleteVideo(video.name, user?.id);
    return data;
  }

  return (
    <Card key={video.id} className="relative max-w-96">
      <div className="absolute -top-4 -right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full text-destructive bg-white p-2 border">
            <TrashIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sideOffset={4}
            className="bg-white p-4 rounded-sm border space-y-1"
          >
            <DropdownMenuItem>
              <Button
                variant="destructive"
                size={"sm"}
                onClick={() => handleDelete(video)}
              >
                Delete
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="secondary" size={"sm"}>
                Cancel
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <video className="w-full aspect-video object-cover rounded mb-2" controls>
        <source src={video.signedUrl} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-col gap-2 text-sm text-gray-600 bg-secondary px-4 py-2">
        {/* <p className="flex gap-1">
          <b>Nome:</b>
          {video.name.split("/").pop()}
        </p>
        <p className="flex gap-1">
          <b>Create At:</b>
          {new Date(video.created_at).toLocaleString()}
        </p> */}
        <pre>{JSON.stringify(video.metadata, null, 2)}</pre>
      </div>
    </Card>
  );
}

export { VideoCard };
