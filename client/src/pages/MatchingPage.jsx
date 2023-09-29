import { NavbarRegistered } from "@/components/base/Navbar";
import FilterUser from "@/pages/FilterUser";
import SideBar from "./match/SideBar";
import Matching from "./match/Matching";

function MatchingPage() {
  return (
    <>
    <div className="relative">
      <NavbarRegistered /></div>
      <section className="h-[92vh] bg-putility-400 flex">
        <SideBar />
        <Matching />
        <FilterUser />
      </section>
    </>
  );
}

export default MatchingPage;
