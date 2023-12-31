import React, { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });
  const navigate = useNavigate();

  // make a login request
  const login = async (data) => {
    try {
      console.log(data);
      const result = await axios.post("http://localhost:4000/auth/login", data);
      const token = result.data.token;
      // console.log(result)
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken });
      console.log(state);
      navigate('/')
    } catch (error) {
      console.log(error);
      setState({
        ...state, error: error
      })
    }
  };
  

  // register the user
  const register = async (data) => {
    await axios.post("http://localhost:4000/auth/register", data, {
      headers: {"Content-Type": "multipart/form-data"}
    });
    navigate("/login");
  };

  // clear the token in localStorage and the user data
  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null, error: null });
    window.location.replace("/login");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
