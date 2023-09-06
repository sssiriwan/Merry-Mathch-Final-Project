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
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";

export function LoginPage() {
  const [username, setUsername] = useState("ploy");
  const [password, setPassword] = useState("1234");
  const {login} = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      username: username || email,
      password
    })
    console.log(username,password)
  }
  return (
    <>
      <Navbar />
      <div className="flex h-screen justify-center items-center space-x-2 ">
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
          <div className="grid w-full max-w-sm items-center gap-1.5 pb-2 pr-5">
            {/* <ButtonPrimary>Login</ButtonPrimary> */}
            <button onSubmit={handleSubmit}>Login</button>
          </div>

            <div className="h-[32px] flex items-center">
              <CardTitle className="text-black mr-2 text-base">
                <TypographySmall>Don’t have an account?</TypographySmall>
              </CardTitle>
              <span className="text-base text-pred-500 cursor-pointer hover:text-pred-400 active:text-pred-200"><Link to='/register'>
                register</Link>
              </span>
            </div>
          </Card>
        </div>
    </>
  );
}
