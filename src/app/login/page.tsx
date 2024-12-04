import { Card } from "@/components/ui/card";
import { login, signup } from "../actions/users";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Login</h1>
      <Card className="flex flex-col w-fit p-4 justify-center items-start">
        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="flex gap-2">
            <Button formAction={login}>Log in</Button>
            <Button formAction={signup}>Sign up</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
