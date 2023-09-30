import { ButtonDemo, ButtonSecondary } from "@/components/base/button/Button";
import { useAdmin } from "@/contexts/adminPackageContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function PackageAddAction() {
  const {setErrorLimit,setErrorName,setErrorPrice, icon, limit, name, price, detailList, setErrorDetail} = useAdmin();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    if (name.length == 0) {
      setErrorName("Please enter a package name");
      isValid = false;
    } else {
      setErrorName("");
    }

    if (price == 0) {
      setErrorPrice("Please enter a price");
      isValid = false;
    } else {
      setErrorPrice("");
    }

    if (limit == 0) {
      setErrorLimit("Please select a package limit");
      isValid = false;
    } else {
      setErrorLimit("");
    }

    if (detailList == 0) {
      setErrorDetail("Please enter at least 1 detail ")
      isValid = false
    } else {
      setErrorDetail("")
    }
    
    if (isValid) {
      addPackage();
    }
  };

  const addPackage = async () => {
    const formData = new FormData();
    formData.append("package_icon", icon);
    formData.append("package_name", name);
    formData.append("package_limit", limit);
    formData.append("price", price);
    for (let detailKey of detailList) {
      formData.append('detail', detailKey)
    }
    for (let iconKey in icon) {
      formData.append("icon", icon[iconKey]);
    }
    const result = await axios.post(
      "http://localhost:4000/admin/package",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    navigate("/admin");
  };


  return (
    <div className="flex space-x-2">
      <ButtonSecondary><Link to="/">Cancel</Link></ButtonSecondary>
      <ButtonDemo onClick={handleSubmit}>Create</ButtonDemo>
    </div>
  );
}

export default PackageAddAction;
