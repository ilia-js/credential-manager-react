import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,

} from "react-router-dom";
import Login from "./components/auth/Login";
import { localRoutes } from "./settings/localRoutes";
import PasswordsTable from "./components/tables/PasswordsTable";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<App/>}>
        <Route path={localRoutes.home} element={<PasswordsTable />} />
        <Route path={localRoutes.login} element={<Login />} />
    </Route>
))

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);
