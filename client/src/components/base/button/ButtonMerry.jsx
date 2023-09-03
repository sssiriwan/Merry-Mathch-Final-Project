import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";

export function ButtonMerry() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className=" bg-white shadow-2xl hover:bg-slate-50">
          <Link to="/admin">
            <svg
              width="44"
              height="42"
              viewBox="0 0 44 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_3623_1615)">
                <path
                  d="M19.5836 27.298L19.5776 27.2944L19.5548 27.2824C19.0813 27.0247 18.6162 26.7518 18.1604 26.464C17.0737 25.7802 16.0381 25.0181 15.062 24.184C12.854 22.2796 10.4 19.4224 10.4 16C10.4001 14.8833 10.7464 13.7942 11.3912 12.8825C12.0359 11.9708 12.9475 11.2814 14.0003 10.9092C15.0531 10.537 16.1954 10.5004 17.2698 10.8043C18.3443 11.1083 19.2982 11.7378 20 12.6064C20.7019 11.7378 21.6557 11.1083 22.7302 10.8043C23.8047 10.5004 24.947 10.537 25.9998 10.9092C27.0526 11.2814 27.9641 11.9708 28.6089 12.8825C29.2536 13.7942 29.5999 14.8833 29.6 16C29.6 19.4224 27.1472 22.2796 24.938 24.184C23.5512 25.3689 22.0456 26.4072 20.4452 27.2824L20.4224 27.2944L20.4164 27.298H20.414C20.2865 27.3655 20.1445 27.4009 20.0002 27.4011C19.8559 27.4013 19.7137 27.3663 19.586 27.2992L19.5836 27.298Z"
                  fill="#C70039"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_3623_1615"
                  x="0.400024"
                  y="0.600464"
                  width="43.2"
                  height="40.8007"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="2" dy="2" />
                  <feGaussianBlur stdDeviation="6" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.249604 0 0 0 0 0.196181 0 0 0 0 0.520833 0 0 0 0.12 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_3623_1615"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_3623_1615"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </Link>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <p className="text-sm">Merry</p>
      </HoverCardContent>
    </HoverCard>
  );
}
