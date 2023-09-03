import { TypographyH1 } from "@/components/base/button/Typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginPage() {
  return (
    <div>
        <TypographyH1>Welcome back to</TypographyH1>
        <TypographyH1>Merry Match</TypographyH1>
      <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
        <Label htmlFor="email">Username or Email</Label>
        <Input type="email" id="email" placeholder="Enter Username or Email" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Enter Password" />
      </div>
    </div>
  );
}
