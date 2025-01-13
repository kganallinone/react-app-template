import ReactDOM from "react-dom/client";
import "./index.css";
import { lazy, StrictMode, Suspense } from "react";

import SplashScreen from "./app/components/others/SplashScreen";
const Router = lazy(() => import("./app/router/Router"));
import ToastProvider from "./app/context/ToastProvider";
import { AuthProvider } from "./app/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Suspense fallback={<SplashScreen />}>
        <ToastProvider>
          <Router />
        </ToastProvider>
      </Suspense>
    </AuthProvider>
  </StrictMode>
);
