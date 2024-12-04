"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// export async function getVideo(userId: string, videoName: string) {
//   const supabase = await createClient();

//   if (error) {
//     console.error("Error fetching video:", error);
//   }

//   return data;
// }

export async function getVideos(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("videos")
    .list(`${userId}`, {
      limit: 100,
      offset: 0,
      sortBy: { column: "created_at", order: "desc" },
    });

  if (error) {
    console.error("Error fetching videos:", error);
  }

  return data;
}

export async function uploadVideo(userId: string, file: File) {
  const supabase = await createClient();

  const customMetadata = { title: "My Video", description: "A sample video" };

  const { error } = await supabase.storage
    .from("videos")
    .upload(`${userId}/${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
      metadata: customMetadata,
    });

  if (error) {
    console.error("Error uploading video:", error);
  }
  revalidatePath("/");
}

export async function getVideoUrl(userId: string, videoName: string) {
  const supabase = await createClient();

  const { data } = await supabase.storage
    .from("videos")
    .getPublicUrl(`${userId}/${videoName}`);

  return data.publicUrl;
}

export async function getSignedUrlVideo(userId: string, videoName: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("videos")
    .createSignedUrl(`${userId}/${videoName}`, 60);

  if (error) {
    console.error("Error Signed video:", error);
  }
  return data?.signedUrl;
}

export async function deleteVideo(videoName: string, userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("videos")
    .remove([`${userId}/${videoName}`]);

  if (error) {
    console.error("Error deleting video:", error);
  }
  revalidatePath("/");
  return data;
}
