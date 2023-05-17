import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/HomePage/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export { AppRoutes };
