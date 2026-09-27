import { useState } from "react";
import { NavbarRegistered } from "@/components/base/Navbar";
import FilterUser from "@/pages/FilterUser";
import SideBar from "./match/SideBar";
import Matching from "./match/Matching";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function MatchingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="relative z-30 shrink-0">
        <NavbarRegistered />
      </div>

      <section className="flex min-h-0 flex-1 items-stretch justify-center">
        <SideBar />
        <Matching />
        <FilterUser />
      </section>

      <div className="z-30 flex shrink-0 items-center gap-3 border-t-2 border-pgray-100 bg-white px-4 py-2 lg:hidden">
        <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full rounded-2xl py-5 font-bold text-ppurple-600"
            >
              Merry List
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[88vw] max-w-sm overflow-y-auto p-0"
          >
            <SheetHeader className="border-b-2 border-pgray-100 px-4 py-3">
              <SheetTitle className="text-left text-xl">Merry List</SheetTitle>
            </SheetHeader>
            <SideBar isDrawer onNavigate={() => setIsChatOpen(false)} />
          </SheetContent>
        </Sheet>

        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full rounded-2xl py-5 font-bold text-ppurple-600"
            >
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[88vw] max-w-sm overflow-y-auto p-0"
          >
            <SheetHeader className="border-b-2 border-pgray-100 px-4 py-3">
              <SheetTitle className="text-left text-xl">
                Filter User
              </SheetTitle>
            </SheetHeader>
            <FilterUser isDrawer />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default MatchingPage;
