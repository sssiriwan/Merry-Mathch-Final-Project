import { useContext } from "react";
import { createContext, useState } from "react";

const PackageContext = createContext();

function PackageProvider(props) {
    const [packageId, setPackageId] = useState(null)

    return (
        <PackageContext.Provider value={{packageId, setPackageId}}>{props.children}</PackageContext.Provider>
    )
}
const usePackage = () => useContext(PackageContext);

export { PackageProvider, usePackage }