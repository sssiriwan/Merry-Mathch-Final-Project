import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authentication";
import jwtInterceptor from "./utils/jwtInterceptor.js";
import { FormProvider } from "./formContext/form.context.jsx";

jwtInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
