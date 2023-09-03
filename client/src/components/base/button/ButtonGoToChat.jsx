import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";


export function ButtonGoToChat() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className=" bg-white shadow-2xl hover:bg-slate-50">
          <Link to="/admin">
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 0.599976C4.82802 0.599976 0.400024 4.23958 0.400024 8.99998C0.400024 11.4288 1.57362 13.59 3.39882 15.102C3.38209 15.8477 3.16578 16.5754 2.77242 17.2092C2.69087 17.3409 2.64467 17.4913 2.63831 17.6461C2.63195 17.8009 2.66563 17.9546 2.7361 18.0926C2.80657 18.2305 2.91145 18.3479 3.04058 18.4334C3.16971 18.519 3.31873 18.5697 3.47322 18.5808C5.15499 18.7067 6.82735 18.236 8.19642 17.2512C8.78082 17.3496 9.38443 17.4 10 17.4C15.172 17.4 19.6 13.7604 19.6 8.99998C19.6 4.23958 15.172 0.599976 10 0.599976ZM10 10.2C10.3183 10.2 10.6235 10.0735 10.8486 9.8485C11.0736 9.62346 11.2 9.31824 11.2 8.99998C11.2 8.68172 11.0736 8.37649 10.8486 8.15145C10.6235 7.9264 10.3183 7.79998 10 7.79998C9.68176 7.79998 9.37654 7.9264 9.1515 8.15145C8.92645 8.37649 8.80002 8.68172 8.80002 8.99998C8.80002 9.31824 8.92645 9.62346 9.1515 9.8485C9.37654 10.0735 9.68176 10.2 10 10.2ZM7.60002 8.99998C7.60002 9.31824 7.4736 9.62346 7.24855 9.8485C7.02351 10.0735 6.71828 10.2 6.40002 10.2C6.08176 10.2 5.77654 10.0735 5.5515 9.8485C5.32645 9.62346 5.20002 9.31824 5.20002 8.99998C5.20002 8.68172 5.32645 8.37649 5.5515 8.15145C5.77654 7.9264 6.08176 7.79998 6.40002 7.79998C6.71828 7.79998 7.02351 7.9264 7.24855 8.15145C7.4736 8.37649 7.60002 8.68172 7.60002 8.99998ZM13.6 10.2C13.9183 10.2 14.2235 10.0735 14.4486 9.8485C14.6736 9.62346 14.8 9.31824 14.8 8.99998C14.8 8.68172 14.6736 8.37649 14.4486 8.15145C14.2235 7.9264 13.9183 7.79998 13.6 7.79998C13.2818 7.79998 12.9765 7.9264 12.7515 8.15145C12.5265 8.37649 12.4 8.68172 12.4 8.99998C12.4 9.31824 12.5265 9.62346 12.7515 9.8485C12.9765 10.0735 13.2818 10.2 13.6 10.2Z"
                fill="#646D89"
              />
            </svg>
          </Link>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <p className="text-sm">Go to chat</p>
      </HoverCardContent>
    </HoverCard>
  );
}
