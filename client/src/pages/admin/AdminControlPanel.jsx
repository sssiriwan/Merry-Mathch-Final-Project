import { Button } from "@/components/ui/button";
import packageImg from "@/public/icons/MerryPackage.png";
import complaintImg from "@/public/icons/ComplaintIcon.png";
import ButtonGhostAdminPanel from "@/components/base/button/ButtonGhostAdminPanel";
import MerryLogo from "@/components/base/button/MerryLogo";
import logoutIcon from "@/public/icons/LogoutIcon.png"

function AdminControlPanel() {
  return (
    <div className="w-[240px] h-screen border-r">
      <div id="logo" className="flex flex-col items-center justify-center my-5">
        <MerryLogo />
        <h6 className="text-pgray-600">Admin Panel Control</h6>
      </div>
      <div className="w-full h-2/3">
        <ButtonGhostAdminPanel imgSrc={packageImg} >Merry Package</ButtonGhostAdminPanel>
        <ButtonGhostAdminPanel imgSrc={complaintImg} >Complaint</ButtonGhostAdminPanel>
      </div>
      <div className="border-t">
        <ButtonGhostAdminPanel imgSrc={logoutIcon}>Log out</ButtonGhostAdminPanel>
      </div>
    </div>
  );
}

export default AdminControlPanel;
