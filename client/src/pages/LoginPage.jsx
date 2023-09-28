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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, state } = useAuth();
  const auth = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
    login({
      username,
      password,
    });
    console.log(state);
  };
  return (
    <div className="h-screen overflow-hidden">
      <div className="relative">
      {!auth.isAuthenticated ? (
        <Navbar />
      ) : 
      ( <NavbarRegistered />
      // ( window.location.replace('/') ,<checkAuthenticateUser /> 
      )}
      </div>
      <section className="flex h-full justify-evenly items-center bg-[#FCFCFE]">
        {/* กล่องด้านขวา */}
        <img src={boy} className="pb-20" />
        {/* กล่องด้านซ้าย */}
        <form
          className="w-1/3 h-[90%] border-hidden flex flex-col justify-evenly py-20"
          onSubmit={handleSubmit}
        >
          <CardHeader>
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
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2 mt-5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pb-2 mt-10">
              <Button className="rounded-full bg-pred-500 w-full">Login</Button>
            </div>
            <div className="h-[32px] flex items-center mt-5">
            <CardTitle className="text-black mr-2 text-base">
              <TypographySmall>Don’t have an account?</TypographySmall>
            </CardTitle>
            <span className="text-pred-500 font-bold cursor-pointer hover:text-pred-400 active:text-pred-200">
              <a href="/register">Register</a>
            </span>
          </div>
          </CardContent>
        </form>
      </section>
    </div>
  );
}
