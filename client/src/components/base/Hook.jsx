import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Hook = () => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await axios.get("http://localhost:4000/auth");
      const users = response.data.data.data;
      setData(users);
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return;
};

export default Hook;
