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

export function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen justify-center items-center ">
        {/* กล่องด้านขวา */}
        <img src={boy} />
        {/* กล่องด้านซ้าย */}
        <Card className="w-1/2 h-[90%] mr-5 border-hidden flex flex-col justify-evenly py-20 ">
          <CardHeader className="">
            <CardTitle className="text-pbeige-700">
              <TypographySmall>LOGIN</TypographySmall>
            </CardTitle>
            <CardDescription>
              <TypographyH1>Welcome back to</TypographyH1>
              <TypographyH1>Merry Match</TypographyH1>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
              <Label htmlFor="email">Username or Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter Username or Email"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter Password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <ButtonPrimary>Submit</ButtonPrimary>
          </CardFooter>
          <CardTitle className="text-black mr-5 ">
            <TypographySmall>Don’t have an account?</TypographySmall>
          </CardTitle>
        </Card>
      </div>
    </>
  );
}
