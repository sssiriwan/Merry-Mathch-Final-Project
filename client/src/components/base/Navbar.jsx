import React, { useEffect, useState } from "react";
import { ButtonMerryPackageProfile, ButtonPrimary } from "./button/Button";
import MerryLogo from "./button/MerryLogo";
import { Button } from "../ui/button";
import { ButtonProfile } from "./button/ButtonProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/authentication";
import axios from "axios";

const Navbar = () => {
  return (
    <nav className="h-20 flex justify-around items-center shadow-3xl">
      <MerryLogo />
      <div className="flex items-center font-bold text-ppurple-600">
        <a href="/#sec2">
          <span className="mr-8">Why Merry Match?</span>
        </a>
        <a href="/#sec4">
          <span className="mr-8">How to Merry</span>
        </a>
        <a href="/login">
          <ButtonPrimary>Login</ButtonPrimary>
        </a>
      </div>
    </nav>
  );
};

function NavbarRegistered() {
  const [isLoading, setIsLoading] = useState(false);
  const [userImg, setUserImg] = useState("");

  const getMyProfile = async () => {
    setIsLoading(true);
    const result = await axios.get("http://localhost:4000/post/profile");
    setIsLoading(false);
    setUserImg(Object.values(result.data.data.profile_image)[0]);
  };
  useEffect(() => {
    getMyProfile();
  }, []);
  const { logout } = useAuth();
  return (
    <nav className="w-full h-20 flex justify-around items-center shadow-md">
      <MerryLogo />
      <div className="flex">
        <Button variant="link" className="font-bold text-[#191C77]">
          <a href="/matching">Start Matching!</a>
        </Button>
        <Button variant="link" className="font-bold text-[#191C77]">
          <a href="/package">Merry Membership</a>
        </Button>
        {/* Notification's Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-pgray-100 flex justify-center items-center ml-14">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.24973 7C3.24973 5.20979 3.96089 3.4929 5.22676 2.22703C6.49263 0.961159 8.20952 0.25 9.99973 0.25C11.7899 0.25 13.5068 0.961159 14.7727 2.22703C16.0386 3.4929 16.7497 5.20979 16.7497 7V7.75C16.7497 9.873 17.5497 11.807 18.8677 13.27C18.9498 13.361 19.0084 13.4707 19.0383 13.5896C19.0682 13.7084 19.0685 13.8328 19.0391 13.9518C19.0098 14.0708 18.9518 14.1808 18.8702 14.2722C18.7885 14.3636 18.6857 14.4335 18.5707 14.476C17.0267 15.046 15.4107 15.466 13.7397 15.719C13.7774 16.2331 13.7086 16.7495 13.5377 17.2359C13.3668 17.7222 13.0974 18.1681 12.7464 18.5457C12.3955 18.9233 11.9704 19.2245 11.4978 19.4304C11.0252 19.6364 10.5152 19.7427 9.99973 19.7427C9.48421 19.7427 8.97423 19.6364 8.50164 19.4304C8.02905 19.2245 7.60399 18.9233 7.25302 18.5457C6.90205 18.1681 6.6327 17.7222 6.4618 17.2359C6.29089 16.7495 6.22211 16.2331 6.25973 15.719C4.61138 15.4692 2.99272 15.0524 1.42873 14.475C1.31386 14.4326 1.21113 14.3627 1.12949 14.2715C1.04786 14.1802 0.989805 14.0703 0.96041 13.9515C0.931015 13.8326 0.931168 13.7084 0.960858 13.5896C0.990547 13.4708 1.04887 13.3611 1.13073 13.27C2.49754 11.7567 3.25281 9.78919 3.24973 7.75V7ZM7.75173 15.9C7.73894 16.2032 7.78761 16.5058 7.89481 16.7897C8.00202 17.0736 8.16554 17.3329 8.37555 17.5519C8.58556 17.771 8.83771 17.9453 9.11683 18.0644C9.39595 18.1835 9.69627 18.2448 9.99973 18.2448C10.3032 18.2448 10.6035 18.1835 10.8826 18.0644C11.1618 17.9453 11.4139 17.771 11.6239 17.5519C11.8339 17.3329 11.9974 17.0736 12.1046 16.7897C12.2119 16.5058 12.2605 16.2032 12.2477 15.9C10.7521 16.0347 9.24737 16.0347 7.75173 15.9Z"
                  fill="#FFE1EA"
                />
              </svg>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 py-5 px-3 rounded-2xl">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <div className="relative">
                  <svg
                    className="absolute bottom-1 right-0"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.96689 8.53302C4.16585 8.65864 4.36884 8.77777 4.57554 8.89023L4.57552 8.89027L4.57874 8.89197L4.58575 8.89618L4.60029 8.90344C4.72405 8.96741 4.86141 9.00072 5.00079 9.00052C5.09238 9.00038 5.18306 8.98578 5.26954 8.95753H5.312L5.42101 8.89212L5.4254 8.88972C6.12247 8.50853 6.77826 8.05627 7.3823 7.54017L7.3823 7.54017L7.38396 7.53874C8.3233 6.729 9.5 5.40955 9.5 3.75003V3.74998C9.49995 3.18132 9.3236 2.62666 8.99525 2.16237C8.6669 1.69808 8.20269 1.347 7.66654 1.15748C7.13039 0.967947 6.54867 0.94929 6.00148 1.10407C5.63298 1.20831 5.29235 1.38775 5 1.62892C4.70766 1.38775 4.36702 1.20831 3.99852 1.10407C3.45133 0.94929 2.86961 0.967947 2.33346 1.15748C1.79731 1.347 1.3331 1.69808 1.00475 2.16237C0.676397 2.62666 0.500054 3.18132 0.5 3.74998V3.75003C0.5 5.40959 1.67729 6.72907 2.61594 7.53866L2.61766 7.54013C3.04272 7.90339 3.49365 8.23523 3.96689 8.53302ZM3.96689 8.53302C3.96677 8.53295 3.96666 8.53288 3.96655 8.53281L4.2335 8.11003L3.96722 8.53323C3.96711 8.53316 3.967 8.53309 3.96689 8.53302Z"
                      fill="#FF1659"
                      stroke="white"
                    />
                  </svg>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://avatars.githubusercontent.com/u/132745974?v=4"
                  />
                </div>
                <div className="ml-3 text-pgray-700">
                  <p>'Karl Drogo' Just Merry you!</p>
                  <p>Click here to see profile</p>
                </div>
              </DropdownMenuItem>
              <hr className="border-hidden h-2" />
              <DropdownMenuItem>
                <div className="relative">
                  <svg
                    className="absolute bottom-1 right-0"
                    width="17"
                    height="10"
                    viewBox="0 0 17 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_96_1463)">
                      <path
                        d="M4.96689 8.53302C5.16585 8.65864 5.36884 8.77777 5.57554 8.89023L5.57552 8.89027L5.57874 8.89197L5.58575 8.89618L5.60029 8.90344C5.72405 8.96741 5.86141 9.00072 6.00079 9.00052C6.09238 9.00038 6.18306 8.98578 6.26954 8.95753H6.312L6.42101 8.89212L6.4254 8.88972C7.12247 8.50853 7.77826 8.05627 8.3823 7.54017L8.3823 7.54017L8.38396 7.53874C9.3233 6.729 10.5 5.40955 10.5 3.75003V3.74998C10.4999 3.18132 10.3236 2.62666 9.99525 2.16237C9.6669 1.69808 9.20269 1.347 8.66654 1.15748C8.13039 0.967947 7.54867 0.94929 7.00148 1.10407C6.63298 1.20831 6.29235 1.38775 6 1.62892C5.70766 1.38775 5.36702 1.20831 4.99852 1.10407C4.45133 0.94929 3.86961 0.967947 3.33346 1.15748C2.79731 1.347 2.3331 1.69808 2.00475 2.16237C1.6764 2.62666 1.50005 3.18132 1.5 3.74998V3.75003C1.5 5.40959 2.67729 6.72907 3.61594 7.53866L3.61766 7.54013C4.04272 7.90339 4.49365 8.23523 4.96689 8.53302ZM4.96689 8.53302C4.96677 8.53295 4.96666 8.53288 4.96655 8.53281L5.2335 8.11003L4.96722 8.53323C4.96711 8.53316 4.967 8.53309 4.96689 8.53302Z"
                        fill="#FF1659"
                        stroke="white"
                      />
                    </g>
                    <g clip-path="url(#clip1_96_1463)">
                      <path
                        d="M10.9669 8.53302C11.1659 8.65864 11.3688 8.77777 11.5755 8.89023L11.5755 8.89027L11.5787 8.89197L11.5858 8.89618L11.6003 8.90344C11.7241 8.96741 11.8614 9.00072 12.0008 9.00052C12.0924 9.00038 12.1831 8.98578 12.2695 8.95753H12.312L12.421 8.89212L12.4254 8.88972C13.1225 8.50853 13.7783 8.05627 14.3823 7.54017L14.3823 7.54017L14.384 7.53874C15.3233 6.729 16.5 5.40955 16.5 3.75003V3.74998C16.4999 3.18132 16.3236 2.62666 15.9953 2.16237C15.6669 1.69808 15.2027 1.347 14.6665 1.15748C14.1304 0.967947 13.5487 0.94929 13.0015 1.10407C12.633 1.20831 12.2923 1.38775 12 1.62892C11.7077 1.38775 11.367 1.20831 10.9985 1.10407C10.4513 0.94929 9.86961 0.967947 9.33346 1.15748C8.79731 1.347 8.3331 1.69808 8.00475 2.16237C7.6764 2.62666 7.50005 3.18132 7.5 3.74998V3.75003C7.5 5.40959 8.67729 6.72907 9.61594 7.53866L9.61766 7.54013C10.0427 7.90339 10.4936 8.23523 10.9669 8.53302ZM10.9669 8.53302C10.9668 8.53295 10.9667 8.53288 10.9666 8.53281L11.2335 8.11003L10.9672 8.53323C10.9671 8.53316 10.967 8.53309 10.9669 8.53302Z"
                        fill="#FF1659"
                        stroke="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_96_1463">
                        <rect
                          width="10"
                          height="10"
                          fill="white"
                          transform="translate(1)"
                        />
                      </clipPath>
                      <clipPath id="clip1_96_1463">
                        <rect
                          width="10"
                          height="10"
                          fill="white"
                          transform="translate(7)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://avatars.githubusercontent.com/u/134696384?v=4"
                  />
                </div>
                <div className="ml-3 text-pgray-700">
                  <p>'Daeny' Merry you back!</p>
                  <p>Let's start conversation now</p>
                </div>
              </DropdownMenuItem>
              <hr className="border-hidden h-2" />
              <DropdownMenuItem>
                <div className="relative">
                  <svg
                    className="absolute bottom-1 right-0"
                    width="17"
                    height="10"
                    viewBox="0 0 17 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_96_1463)">
                      <path
                        d="M4.96689 8.53302C5.16585 8.65864 5.36884 8.77777 5.57554 8.89023L5.57552 8.89027L5.57874 8.89197L5.58575 8.89618L5.60029 8.90344C5.72405 8.96741 5.86141 9.00072 6.00079 9.00052C6.09238 9.00038 6.18306 8.98578 6.26954 8.95753H6.312L6.42101 8.89212L6.4254 8.88972C7.12247 8.50853 7.77826 8.05627 8.3823 7.54017L8.3823 7.54017L8.38396 7.53874C9.3233 6.729 10.5 5.40955 10.5 3.75003V3.74998C10.4999 3.18132 10.3236 2.62666 9.99525 2.16237C9.6669 1.69808 9.20269 1.347 8.66654 1.15748C8.13039 0.967947 7.54867 0.94929 7.00148 1.10407C6.63298 1.20831 6.29235 1.38775 6 1.62892C5.70766 1.38775 5.36702 1.20831 4.99852 1.10407C4.45133 0.94929 3.86961 0.967947 3.33346 1.15748C2.79731 1.347 2.3331 1.69808 2.00475 2.16237C1.6764 2.62666 1.50005 3.18132 1.5 3.74998V3.75003C1.5 5.40959 2.67729 6.72907 3.61594 7.53866L3.61766 7.54013C4.04272 7.90339 4.49365 8.23523 4.96689 8.53302ZM4.96689 8.53302C4.96677 8.53295 4.96666 8.53288 4.96655 8.53281L5.2335 8.11003L4.96722 8.53323C4.96711 8.53316 4.967 8.53309 4.96689 8.53302Z"
                        fill="#FF1659"
                        stroke="white"
                      />
                    </g>
                    <g clip-path="url(#clip1_96_1463)">
                      <path
                        d="M10.9669 8.53302C11.1659 8.65864 11.3688 8.77777 11.5755 8.89023L11.5755 8.89027L11.5787 8.89197L11.5858 8.89618L11.6003 8.90344C11.7241 8.96741 11.8614 9.00072 12.0008 9.00052C12.0924 9.00038 12.1831 8.98578 12.2695 8.95753H12.312L12.421 8.89212L12.4254 8.88972C13.1225 8.50853 13.7783 8.05627 14.3823 7.54017L14.3823 7.54017L14.384 7.53874C15.3233 6.729 16.5 5.40955 16.5 3.75003V3.74998C16.4999 3.18132 16.3236 2.62666 15.9953 2.16237C15.6669 1.69808 15.2027 1.347 14.6665 1.15748C14.1304 0.967947 13.5487 0.94929 13.0015 1.10407C12.633 1.20831 12.2923 1.38775 12 1.62892C11.7077 1.38775 11.367 1.20831 10.9985 1.10407C10.4513 0.94929 9.86961 0.967947 9.33346 1.15748C8.79731 1.347 8.3331 1.69808 8.00475 2.16237C7.6764 2.62666 7.50005 3.18132 7.5 3.74998V3.75003C7.5 5.40959 8.67729 6.72907 9.61594 7.53866L9.61766 7.54013C10.0427 7.90339 10.4936 8.23523 10.9669 8.53302ZM10.9669 8.53302C10.9668 8.53295 10.9667 8.53288 10.9666 8.53281L11.2335 8.11003L10.9672 8.53323C10.9671 8.53316 10.967 8.53309 10.9669 8.53302Z"
                        fill="#FF1659"
                        stroke="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_96_1463">
                        <rect
                          width="10"
                          height="10"
                          fill="white"
                          transform="translate(1)"
                        />
                      </clipPath>
                      <clipPath id="clip1_96_1463">
                        <rect
                          width="10"
                          height="10"
                          fill="white"
                          transform="translate(7)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://avatars.githubusercontent.com/u/134715451?v=4"
                  />
                </div>
                <div className="ml-3 text-pgray-700">
                  <p>'Daeny' Merry you back!</p>
                  <p>Let's start conversation now</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Profile's Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="ml-3">
              <AvatarImage className="object-cover" src={userImg} />
              <AvatarFallback>User Image</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-2xl">
            <DropdownMenuLabel>
              <ButtonMerryPackageProfile />
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <a href="/profile">
                <DropdownMenuItem>
                  {/* <User className="mr-2 h-4 w-4" /> */}
                  <svg
                    width="12"
                    height="15"
                    viewBox="0 0 12 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.00039 3.5C3.00039 2.70435 3.31646 1.94129 3.87907 1.37868C4.44168 0.81607 5.20474 0.5 6.00039 0.5C6.79604 0.5 7.5591 0.81607 8.12171 1.37868C8.68432 1.94129 9.00039 2.70435 9.00039 3.5C9.00039 4.29565 8.68432 5.05871 8.12171 5.62132C7.5591 6.18393 6.79604 6.5 6.00039 6.5C5.20474 6.5 4.44168 6.18393 3.87907 5.62132C3.31646 5.05871 3.00039 4.29565 3.00039 3.5ZM0.501056 12.9033C0.523536 11.4596 1.11282 10.0827 2.1417 9.06972C3.17058 8.05674 4.55653 7.48897 6.00039 7.48897C7.44425 7.48897 8.8302 8.05674 9.85908 9.06972C10.888 10.0827 11.4772 11.4596 11.4997 12.9033C11.5015 13.0005 11.4748 13.0961 11.4231 13.1784C11.3713 13.2607 11.2967 13.3261 11.2084 13.3667C9.5745 14.1158 7.79783 14.5024 6.00039 14.5C4.14306 14.5 2.37839 14.0947 0.79239 13.3667C0.704047 13.3261 0.62944 13.2607 0.577698 13.1784C0.525955 13.0961 0.499322 13.0005 0.501056 12.9033Z"
                      fill="#FFE1EA"
                    />
                  </svg>
                  <span className="ml-2 text-pgray-700">Profile</span>
                </DropdownMenuItem>
              </a>
              <a href="/merry-list">
                <DropdownMenuItem>
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 w-5"
                  >
                    <path
                      d="M6.72201 12.0321L6.71801 12.0297L6.70281 12.0217C6.38712 11.8499 6.07709 11.6679 5.77321 11.476C5.0487 11.0202 4.35834 10.5122 3.70761 9.95605C2.23561 8.68645 0.599609 6.78165 0.599609 4.50005C0.59968 3.75562 0.830529 3.02952 1.26037 2.42172C1.69021 1.81393 2.2979 1.35433 2.99977 1.10622C3.70164 0.858111 4.46316 0.833687 5.17949 1.03631C5.89581 1.23894 6.53171 1.65865 6.99961 2.23765C7.46751 1.65865 8.10341 1.23894 8.81973 1.03631C9.53606 0.833687 10.2976 0.858111 10.9994 1.10622C11.7013 1.35433 12.309 1.81393 12.7388 2.42172C13.1687 3.02952 13.3995 3.75562 13.3996 4.50005C13.3996 6.78165 11.7644 8.68645 10.2916 9.95605C9.36708 10.746 8.36334 11.4382 7.29641 12.0217L7.28121 12.0297L7.27721 12.0321H7.27561C7.19061 12.0771 7.0959 12.1007 6.99971 12.1008C6.90352 12.101 6.80874 12.0776 6.72361 12.0329L6.72201 12.0321Z"
                      fill="#FFE1EA"
                    />
                  </svg>
                  <span className="ml-2 text-pgray-700">Merry list</span>
                </DropdownMenuItem>
              </a>
              <DropdownMenuItem>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 w-5"
                >
                  <path
                    d="M8.252 1.56803C8.17552 1.5234 8.08855 1.49988 8 1.49988C7.91145 1.49988 7.82448 1.5234 7.748 1.56803L2 4.92136L8 8.42136L14 4.92136L8.252 1.56803ZM14.5 5.78669L8.5 9.28669V15.2867L14.252 11.932C14.3275 11.888 14.3901 11.8249 14.4336 11.7491C14.4771 11.6733 14.5 11.5874 14.5 11.5V5.78669ZM7.5 15.2867V9.28669L1.5 5.78669V11.5C1.49997 11.5874 1.52286 11.6733 1.56637 11.7491C1.60989 11.8249 1.67251 11.888 1.748 11.932L7.5 15.2874V15.2867Z"
                    fill="#FFE1EA"
                  />
                </svg>
                <span className="ml-2 text-pgray-700">
                  <a href="/package">Merry Membership</a>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 w-5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.78806 1.49598C6.32646 0.562376 7.67366 0.562376 8.21206 1.49598L13.2361 10.196C13.7745 11.1296 13.1001 12.296 12.0233 12.296H1.97606C0.898462 12.296 0.224862 11.1296 0.764062 10.196L5.78806 1.49598ZM7.00006 3.49998C7.15919 3.49998 7.3118 3.56319 7.42433 3.67571C7.53685 3.78823 7.60006 3.94085 7.60006 4.09998V6.89998C7.60006 7.05911 7.53685 7.21172 7.42433 7.32424C7.3118 7.43676 7.15919 7.49998 7.00006 7.49998C6.84093 7.49998 6.68832 7.43676 6.5758 7.32424C6.46328 7.21172 6.40006 7.05911 6.40006 6.89998V4.09998C6.40006 3.94085 6.46328 3.78823 6.5758 3.67571C6.68832 3.56319 6.84093 3.49998 7.00006 3.49998ZM7.00006 10.7C7.21223 10.7 7.41572 10.6157 7.56575 10.4657C7.71578 10.3156 7.80006 10.1121 7.80006 9.89998C7.80006 9.6878 7.71578 9.48432 7.56575 9.33429C7.41572 9.18426 7.21223 9.09998 7.00006 9.09998C6.78789 9.09998 6.58441 9.18426 6.43438 9.33429C6.28435 9.48432 6.20006 9.6878 6.20006 9.89998C6.20006 10.1121 6.28435 10.3156 6.43438 10.4657C6.58441 10.6157 6.78789 10.7 7.00006 10.7Z"
                    fill="#FFE1EA"
                  />
                </svg>
                <span className="ml-2 text-pgray-700">
                  <a href="/complaint">Complaint</a>
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              {/* <LogOut className="mr-2 h-4 w-4" /> */}
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2"
              >
                <path
                  d="M8.66667 11.1665V11.8332C8.66667 12.3636 8.45595 12.8723 8.08088 13.2474C7.70581 13.6225 7.1971 13.8332 6.66667 13.8332H4C3.46957 13.8332 2.96086 13.6225 2.58579 13.2474C2.21071 12.8723 2 12.3636 2 11.8332V5.1665C2 4.63607 2.21071 4.12736 2.58579 3.75229C2.96086 3.37722 3.46957 3.1665 4 3.1665H6.66667C7.1971 3.1665 7.70581 3.37722 8.08088 3.75229C8.45595 4.12736 8.66667 4.63607 8.66667 5.1665V5.83317M11.3333 11.1665L14 8.49984L11.3333 11.1665ZM14 8.49984L11.3333 5.83317L14 8.49984ZM14 8.49984H4.66667H14Z"
                  stroke="#646D89"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-pgray-700">
                <button>Log out</button>
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export { NavbarRegistered };
export default Navbar;
