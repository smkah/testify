import { FileObject } from "@supabase/storage-js";

export type VideoWithSignedUrl = {
  signedUrl?: string;
} & FileObject;
