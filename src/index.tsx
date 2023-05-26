import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import { localRoutes } from "./settings/localRoutes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path={localRoutes.home} element={<App />} />
        <Route path={localRoutes.login} element={<Login />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
