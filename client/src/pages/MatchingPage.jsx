import { NavbarRegistered } from "@/components/base/Navbar";
import FilterUser from "@/pages/FilterUser";
import SideBar from "./match/SideBar";
import Matching from "./match/Matching";

function MatchingPage() {
  return (
    <>
      <NavbarRegistered />
      <section className="h-[900px] flex">
        <SideBar />
        <Matching />
        <FilterUser />
      </section>
    </>
  );
}

export default MatchingPage;
