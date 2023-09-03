import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";

export function ButtonProfile() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className=" bg-white shadow-2xl hover:bg-slate-50">
          <Link to="/admin">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15Z"
                fill="#646D89"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.796818 12.708C0.620543 12.25 0.620543 11.7428 0.796818 11.2848C1.66949 9.02217 3.20696 7.07691 5.20677 5.70514C7.20658 4.33338 9.57495 3.59945 12 3.59998C17.1084 3.59998 21.4716 6.79198 23.2032 11.292C23.3796 11.7492 23.3784 12.2568 23.2032 12.7152C22.3305 14.9778 20.7931 16.923 18.7933 18.2948C16.7935 19.6666 14.4251 20.4005 12 20.4C6.89162 20.4 2.52842 17.208 0.796818 12.708ZM16.8 12C16.8 13.273 16.2943 14.4939 15.3941 15.3941C14.494 16.2943 13.2731 16.8 12 16.8C10.727 16.8 9.50608 16.2943 8.6059 15.3941C7.70573 14.4939 7.20002 13.273 7.20002 12C7.20002 10.7269 7.70573 9.50604 8.6059 8.60586C9.50608 7.70569 10.727 7.19998 12 7.19998C13.2731 7.19998 14.494 7.70569 15.3941 8.60586C16.2943 9.50604 16.8 10.7269 16.8 12Z"
                fill="#646D89"
              />
            </svg>
          </Link>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <p className="text-sm">See profile</p>
      </HoverCardContent>
    </HoverCard>
  );
}
