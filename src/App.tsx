import React, { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { CalculatorPage, ManagementPage } from "./pages";
import { Layout } from "./components";
import "./App.css";

const App: FC = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Navigate to={"home"} />} />

          <Route path={"home"} element={<ManagementPage />}></Route>
          <Route
            path={"/calculator/:bankId"}
            element={<CalculatorPage />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
