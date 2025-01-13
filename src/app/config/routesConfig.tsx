import { RouteObject } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

import WarningPage from "../pages/error/WarningPage";

const routes = {
  GUEST: [
    {
      path: "*",
      element: <WarningPage />,
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
