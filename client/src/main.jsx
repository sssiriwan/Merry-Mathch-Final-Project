import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authentication";
import jwtInterceptor from "./utils/jwtInterceptor.js";
import { ValindateProvider } from "./pages/register/valindatecontext/Valindatecontext.jsx";
import { createClient } from '@supabase/supabase-js'
import { PackageProvider } from "./contexts/packageProvider.jsx";

jwtInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ValindateProvider>
          <PackageProvider>
            <App />
          </PackageProvider>
        </ValindateProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
