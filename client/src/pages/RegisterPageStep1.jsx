import {
  TypographyH1,
  TypographySmall,
} from "@/components/base/button/Typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import boy from "../../public/imgs/boy-complaint-form-page.png";
import { ButtonPrimary } from "@/components/base/button/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/base/Navbar";

export function RegisterPageStep1() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen justify-center items-center space-x-2 ">
        {/* กล่องด้านขวา */}
        <Card className="w-1/2 h-[90%] mr-5 border-hidden ">
          <CardContent className="flex flex-col justify-evenly items-end py-20 space-y-3 ">
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
              <Label htmlFor="email">Name</Label>
              <Input type="text" id="name" placeholder="Jon Snow" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
              <Label htmlFor="password">Location</Label>
              <Input
                type="Location"
                id="Location"
                placeholder="Enter Password"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2  ">
              <Label htmlFor="password">Username</Label>
              <Input
                type="Username"
                id="Username"
                placeholder="At least 6 charactor"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="At leasr 8 charactor"
              />
            </div>
          </CardContent>
        </Card>
        {/* กล่องด้านซ้าย */}
        <Card className="w-1/2 h-[90%] mr-5 border-hidden ">
          <CardContent className="flex flex-col justify-evenly items-start py-20 space-y-3 ">
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
              <Label htmlFor="email">Date of birth</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter Username or Email"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
              <Label htmlFor="password">City</Label>
              <Input type="text" id="city" placeholder="Bangkok" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
              <Label htmlFor="email">E-mail</Label>
              <Input type="email" id="email" placeholder="name@website.com" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
              <Label htmlFor="password">Confirm password</Label>
              <Input
                type="password"
                id="password"
                placeholder="At leasr 8 charactor"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
