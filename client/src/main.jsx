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
import { AgeProvider } from "./contexts/ageContext.jsx";
import { AdminProvider } from "./contexts/adminPackageContext.jsx";

jwtInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ValindateProvider>
          <PackageProvider>
            <AgeProvider>
              <AdminProvider>
                <App />
              </AdminProvider>
            </AgeProvider>
          </PackageProvider>
        </ValindateProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
