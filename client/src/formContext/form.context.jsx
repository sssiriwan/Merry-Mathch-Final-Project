import { useState, useContext, createContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");

  const [password, setPassword] = useState("");

  const [gender, setGender] = useState("");
  const [fullname, setFullname] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sexualPreferences, setSexualPreferences] = useState("");
  const [racial, setRacial] = useState("");
  const [meeting, setMeeting] = useState("");
  const [tags, setTags] = useState(["Music"]);
  const [inputValue, setInputValue] = useState("");
  const [avatars, setAvatars] = useState({});
  //   const [inputValue, setInputValue] = useState("");

  return (
    <FormContext.Provider
      value={{
        username,
        fullname,
        location,
        dateBirth,
        city,
        email,
        gender,
        sexualPreferences,
        confirmPassword,
        racial,
        meeting,
        tags,
        avatars,
        password,

        setLocation,
        setAvatars,
        setTags,
        setMeeting,
        setRacial,
        setSexualPreferences,
        setConfirmPassword,
        setEmail,
        setCity,
        setDateBirth,
        setFullname,
        setUsername,
        setPassword,
        setGender,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
