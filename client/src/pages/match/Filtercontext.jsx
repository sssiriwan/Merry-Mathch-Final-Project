import { useState, useContext, createContext } from "react";

export const FilterContext = React.createContext({
  checkboxValue: false,
  minVal: 18,
  maxVal: 80,
});

export const FilterContextProvider = ({ children }) => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [minVal, setMinVal] = useState(18);
  const [maxVal, setMaxVal] = useState(80);

  return (
    <FilterContext.Provider
      value={{
        checkboxValue,
        setCheckboxValue,
        minVal,
        setMinVal,
        maxVal,
        setMaxVal,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
