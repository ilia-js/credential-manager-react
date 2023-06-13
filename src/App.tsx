import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {getAuthToken} from "./helpers/auth";
import {localRoutes, pathsWithoutAuth} from "./settings/localRoutes";
import React, {useEffect, useRef} from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "App.scss";
import {setGlobalToastObject} from "./helpers/toast";
import {Toast} from "primereact/toast";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useRef(null);

  useEffect(() => {
      if (!getAuthToken() && !pathsWithoutAuth.includes(location.pathname)) {
          navigate(localRoutes.login);
      }

      // TODO: It should be uncommented for prod, probably;
      // if (getAuthToken() && pathsWithoutAuth.includes(location.pathname)) {
      //     navigate(localRoutes.home);
      // }

      setGlobalToastObject(toast);
  });

  return (
    <div className="app">
      <Outlet/>
      <Toast ref={toast} />
    </div>
  );
}

