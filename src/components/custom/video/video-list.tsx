import { VideoWithSignedUrl } from "@/app/@types";
import { getUserLoggedIn } from "@/app/actions/users";
import { getSignedUrlVideo, getVideos } from "@/app/actions/videos";
import { VideoCard } from "./video-card";

async function VideoList() {
  const { user } = await getUserLoggedIn();

  if (!user) {
    return null;
  }

  const videos = await getVideos(user?.id);
  let videosWithUrl;

  if (videos) {
    videosWithUrl = await Promise.all(
      videos.map(async (video: VideoWithSignedUrl) => {
        const signedUrl = await getSignedUrlVideo(user.id, video.name);
        return { ...video, signedUrl };
      })
    );
  }

  return (
    <div className="mb-8 w-full self-center">
      {videosWithUrl && videosWithUrl?.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Your testimonies</h2>
          <div className="flex flex-wrap gap-4">
            {videosWithUrl.map((video) => (
              <VideoCard key={video.id} video={video} user={user} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export { VideoList };
