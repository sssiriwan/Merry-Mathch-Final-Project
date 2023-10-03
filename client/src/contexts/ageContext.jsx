import { useContext } from "react";
import { createContext, useState } from "react";

const AgeContext = createContext();

function AgeProvider(props) {
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(80);
    const [female, setFemale] = useState(null);
    const [male, setMale] = useState(null);
    const [nonBi, setNonBi] = useState(null);
    const [keyword, setKeyword] = useState("");

    return (
        <AgeContext.Provider value={{minAge, setMinAge, maxAge, setMaxAge, female, setFemale, male, setMale, nonBi, setNonBi, keyword, setKeyword}}>
            {props.children}
        </AgeContext.Provider>
    )
}

const useAge = () => useContext(AgeContext);

export { AgeProvider, useAge }