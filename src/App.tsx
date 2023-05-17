import "./App.css";

import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <Suspense>
      <RecoilRoot>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </RecoilRoot>
    </Suspense>
  );
}

export default App;
