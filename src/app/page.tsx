import { VideoList, VideoRecorder } from "@/components/custom/video";
import { Button } from "@/components/ui/button";
import { logoff } from "./actions/users";
import { Form } from "@/components/ui/form";

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form action={await logoff}>
        <Button className="row-start-1" type="submit">
          Log out
        </Button>
      </form>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <VideoRecorder />
        <VideoList />
      </main>
    </div>
  );
}
