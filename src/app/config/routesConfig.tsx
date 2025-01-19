import { RouteObject } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

import WarningPage from "../pages/error/WarningPage";
import WelcomePage from "../pages/guest/welcomePage";

const routes = {
  GUEST: [
    {
      path: "*",
      element: <WelcomePage />,
    },
    {
      path: "/",
      element: <WelcomePage />,
    },
  ],
  PROTECTED: [
    {
      element: <MainLayout />,
      children: [
        {
          path: "/home",
          element: <WarningPage />,
        },
      ],
    },
  ] as RouteObject[],
};

export const appRoutes = routes;
