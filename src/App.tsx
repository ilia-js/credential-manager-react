import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {getAuthToken} from "./helpers/auth";
import {localRoutes, pathsWithoutAuth} from "./settings/localRoutes";
import {useEffect} from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "App.scss";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      if (!getAuthToken() && !pathsWithoutAuth.includes(location.pathname)) {
          navigate(localRoutes.login);
      }

      // TODO: It should be uncommented for prod, probably;
      // if (getAuthToken() && pathsWithoutAuth.includes(location.pathname)) {
      //     navigate(localRoutes.home);
      // }
  });

  return (
    <div className="app">
      <Outlet/>
    </div>
  );
}

