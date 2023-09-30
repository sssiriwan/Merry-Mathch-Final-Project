import { useContext } from "react";
import { createContext, useState } from "react";

const AgeContext = createContext();

function AgeProvider(props) {
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(80)

    return (
        <AgeContext.Provider value={{minAge, setMinAge, maxAge, setMaxAge}}>
            {props.children}
        </AgeContext.Provider>
    )
}

const useAge = () => useContext(AgeContext);

export { AgeProvider, useAge }