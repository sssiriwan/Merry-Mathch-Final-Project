import { useState, useContext, createContext } from "react";

const ValindateContext = createContext();

export const ValindateProvider = ({ children }) => {
  const [errorDate, setErrorDate] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCity, setErrorCity] = useState("");
  const [errorSexIden, setErrorSexIden] = useState("");
  const [errorSexPrefer, setErrorSexPrefer] = useState("");
  const [errorRacialPrefer, setErrorRacialPrefer] = useState("");
  const [errorMeetingInter, setErrorMeetingInter] = useState("");
  const [errorImage, setErrorImage] = useState("");

  return (
    <ValindateContext.Provider
      value={{
        errorDate,
        errorUsername,
        errorLocation,
        errorName,
        errorEmail,
        errorPasswordConfirm,
        errorPassword,
        errorCity,
        errorSexIden,
        errorSexPrefer,
        errorRacialPrefer,
        errorMeetingInter,
        errorImage,

        setErrorImage,
        setErrorSexIden,
        setErrorSexPrefer,
        setErrorRacialPrefer,
        setErrorMeetingInter,
        setErrorDate,
        setErrorUsername,
        setErrorLocation,
        setErrorName,
        setErrorEmail,
        setErrorPasswordConfirm,
        setErrorPassword,
        setErrorCity,
      }}
    >
      {children}
    </ValindateContext.Provider>
  );
};

export default ValindateContext;
