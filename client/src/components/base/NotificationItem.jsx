import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const NotificationItem = () => {
  return (
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
  );
};

export default NotificationItem;
