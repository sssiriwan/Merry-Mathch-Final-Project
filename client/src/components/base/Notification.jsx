import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import NotificationItem from "./NotificationItem";
import NotificatioMatch from "./NotificatioMatch";

const Notification = () => {
  return (
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
          {/* map ตรงนี้ */}
          <NotificationItem />
          <hr className="border-hidden h-2" />
          <NotificatioMatch />
          <hr className="border-hidden h-2" />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
