import { Route, Routes } from "react-router-dom";
import PackageAddPage from "../PackageAddPage";
import ComplaintDetailPage from "../ComplaintDetailPage";
import ComplaintListPage from "../ComplaintListPage";
import PackageListPage from "../PackageListPage";
import { LoginPage } from "../LoginPage";
import PackageEditPage from "../PackageEditPage";

function AdminAuthenticatedApp() {
    return (
        <>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<PackageListPage />} />
            <Route path="/admin/package" element={<PackageAddPage />} />
            <Route path="/admin/complain" element={<ComplaintListPage />} />
            <Route path="/admin/complain/complainId" element={<ComplaintDetailPage />} />
            <Route path="/admin/edit/:packageId" element={<PackageEditPage />} />
            <Route path="*" element={<PackageListPage />} />
        </Routes>
        </>
    )
}

export default AdminAuthenticatedApp