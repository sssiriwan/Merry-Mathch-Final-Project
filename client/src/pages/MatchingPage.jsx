import { NavbarRegistered } from "@/components/base/Navbar";
import FilterUser from "@/pages/FilterUser";
import SideBar from "./match/SideBar";
import Matching from "./match/Matching";

function MatchingPage() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="relative">
        <NavbarRegistered />
      </div>
      <section className="h-[92vh] flex justify-center">
        <SideBar />
        <Matching />
        <FilterUser />
      </section>
    </div>
  );
}

export default MatchingPage;
