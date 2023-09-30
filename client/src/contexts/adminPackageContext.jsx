import { useState } from "react";
import { createContext, useContext } from "react";

const AdminContext = createContext();

function AdminProvider(props) {
  const [errorName, setErrorName] = useState("");
  const [errorPrice, setErrorPrice] = useState("");
  const [errorLimit, setErrorLimit] = useState("");
  const [errorDetail, setErrorDetail] = useState("");
  
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(0);
  const [icon, setIcon] = useState({});
  const [price, setPrice] = useState(0);
  const [detailList, setDetailList] = useState([]);
  
  return (
    <AdminContext.Provider value={{errorName, errorLimit, errorPrice, setErrorLimit, setErrorName, setErrorPrice,
    name, setName, limit, setLimit, icon, setIcon, price, setPrice, detailList, setDetailList, errorDetail, setErrorDetail }}>
        {props.children}
    </AdminContext.Provider>
  )
}

const useAdmin = () => useContext(AdminContext)

export {AdminProvider, useAdmin}