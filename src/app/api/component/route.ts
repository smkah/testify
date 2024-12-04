import { SimpleComponent } from "@/components/custom/SimpleComponent";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const html = SimpleComponent({ name: "World" });

  return new Response(JSON.stringify(html), {
    status: 200,
  });
}
