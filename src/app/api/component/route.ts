import { SimpleComponent } from "@/components/custom/SimpleComponent";

export async function GET() {
  const html = SimpleComponent({ name: "World" });

  return new Response(JSON.stringify(html), {
    status: 200,
  });
}
