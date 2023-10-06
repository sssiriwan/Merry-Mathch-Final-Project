import { Route, Routes } from "react-router-dom";
import PackageAddPage from "../PackageAddPage";
import ComplaintActionPage from "../ComplaintActionPage";
import ComplaintListPage from "../ComplaintListPage";
import PackageListPage from "../PackageListPage";
import { LoginPage } from "../LoginPage";
import ComplaintDetailPage from "../ComplaintDetailPage";
import PackageEditPage from "../PackageEditPage";

function AdminAuthenticatedApp() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<PackageListPage />} />
        <Route path="/admin/package" element={<PackageAddPage />} />
        <Route path="/admin/complain" element={<ComplaintListPage />} />
        <Route path="/admin/edit/:packageId" element={<PackageEditPage />} />
        <Route path="/admin/complain/action/:complainId" element={<ComplaintActionPage />}/>
        <Route path="/admin/complain/detail/:complainId" element={<ComplaintDetailPage/>}/>
        <Route path="*" element={<PackageListPage />} />
      </Routes>
    </>
  );
}

export default AdminAuthenticatedApp;
