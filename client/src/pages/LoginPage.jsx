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
import Navbar, { NavbarRegistered } from "@/components/base/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";
import { Button } from "@/components/ui/button";
import Home from "./Home";
import ComplaintListPage from "./ComplaintListPage";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, state } = useAuth();
  const auth = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username,password)
    login({
      username,
      password
    })
    console.log(state)
  }
  return (
    <>
      {!auth.isAuthenticated ? <Navbar/> : state.user.role === 'Admin' ? window.location.replace('/admin') : window.location.replace('/')}
      <div className="flex h-screen justify-center items-center space-x-2 ">
        {/* กล่องด้านขวา */}
        <img src={boy} />
        {/* กล่องด้านซ้าย */}
        <form className="w-1/2 h-[90%] mr-5 border-hidden flex flex-col justify-evenly py-20" onSubmit={handleSubmit}>
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
              <Label htmlFor="username">Username or Email</Label>
              <Input
                type="username"
                id="username"
                placeholder="Enter Username or Email"
                value={username}
                onChange={(event) => { setUsername(event.target.value) }}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => { setPassword(event.target.value) }}
              />
            </div>
          </CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5 pb-2 pr-5">
            <Button>Login</Button>
          </div>
            <div className="h-[32px] flex items-center">
              <CardTitle className="text-black mr-2 text-base">
                <TypographySmall>Don’t have an account?</TypographySmall>
              </CardTitle>
              <span className="text-base text-pred-500 cursor-pointer hover:text-pred-400 active:text-pred-200">
                register
              </span>
            </div>
          </form>
        </div>
    </>
  );
}
