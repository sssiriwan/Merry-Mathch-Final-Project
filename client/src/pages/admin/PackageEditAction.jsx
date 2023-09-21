// import { ButtonDemo, ButtonSecondary } from "@/components/base/button/Button";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function PackageEditAction() {
//   const navigate = useNavigate();
//   const params = useParams();

//   const [name, setName] = useState("");
//   const [limit, setLimit] = useState(0);
//   const [icon, setIcon] = useState("");
//   const [detail, setDetail] = useState([]);

//   const getCurrentPackage = async () => {
//     const response = await axios.get(`http://localhost:4000/admin/package/${params.packageId}`);
//     setName(response.data.data.package_name);
//     setLimit(response.data.data.package_limit);
//     // setIcon(response.data.data.package_icon);
//     // setDetail(response.data.data.package_detail);
//   };

//   const handleEditSubmit = async () => {
//     const updatePackage = {
//       package_name: name,
//       package_limit: limit,
//     };
//     console.log(updatePackage);
//       const result = await axios.put(`http://localhost:4000/admin/package/${params.packageId}`, updatePackage);
//       console.log(result)
//       navigate('/admin');
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   handleEditSubmit();
//   // };

//   useEffect(() => {
//     getCurrentPackage();
//   }, []);

//   return (
//     <div className="flex space-x-2">
//       <ButtonSecondary>
//         <Link to="/admin">Cancel</Link>
//       </ButtonSecondary>
//       <ButtonDemo onClick={() => handleEditSubmit()}>Edit</ButtonDemo>
//     </div>
//   );
// }

// export default PackageEditAction;
