import PackageAddAction from "./admin/PackageAddAction";
import PackageAddDetail from "./admin/PackageAddDetail";
import AdminControlPanel from "./admin/AdminControlPanel";

function PackageAddPage() {
  return (
    <div className="flex">
      <AdminControlPanel />
      <div className="w-full flex flex-col bg-pgray-200 items-center">
        <div className="w-full flex bg-white h-20 justify-between items-center px-20 border-b">
          Add Package
          <PackageAddAction />
        </div>
        <div className="bg-white rounded-2xl border-pgray-200 border-2 px-20 m-7 w-11/12">
          <PackageAddDetail />
        </div>
      </div>
    </div>
  );
}

export default PackageAddPage;
