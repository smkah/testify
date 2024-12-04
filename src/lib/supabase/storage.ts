import { StorageClient } from "@supabase/storage-js";

const storageClient = new StorageClient(
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!,
  {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_KEY!,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_KEY!}`,
  }
);

export { storageClient };
