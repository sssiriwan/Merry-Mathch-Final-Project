import React from 'react'
import PackageEditDetail from './admin/PackageEditDetail';
import AdminControlPanel from "./admin/AdminControlPanel";
import PackageEditAction from './admin/PackageEditAction';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PackageEditPage() {
  const navigate = useNavigate();
  const params = useParams();


  const [name, setName] = useState("");
  const [limit, setLimit] = useState(0);
  const [icon, setIcon] = useState("");
  const [detail, setDetail] = useState("");

  const getCurrentPackage = async () => {
    const response = await axios.get(`http://localhost:4000/admin/package/${params.packageId}`);
    console.log(response);
    setName(response.data.data.package_name);
    setLimit(response.data.data.package_limit);
    setIcon(response.data.data.package_icon);
    setDetail(response.data.data.package_detail);
  } 

  const handleSubmit = async () => {
    const updatePackage = {
      package_name: name,
      package_limit: limit,
    }
    const result = await axios.put(`http://localhost:4000/admin/package/${params.packageId}`, updatePackage)
    navigate('/admin')
  }

  useEffect(() => {
    getCurrentPackage()
  }, [])

    return (
        <div className="flex">
          <AdminControlPanel />
          <div className="w-full flex flex-col bg-pgray-200 items-center">
            <div className="w-full flex bg-white h-20 justify-between items-center px-20 border-b">
              Edit '{name}'
              <PackageEditAction />
            </div>
            <div className="bg-white rounded-2xl border-pgray-200 border-2 px-20 m-7 w-11/12">
              <PackageEditDetail />
            </div>
          </div>
        </div>
      );
}

export default PackageEditPage