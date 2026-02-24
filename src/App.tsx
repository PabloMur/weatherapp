import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <Suspense>
      <RecoilRoot>
        <ErrorBoundary>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ErrorBoundary>
      </RecoilRoot>
    </Suspense>
  );
}

export default App;
