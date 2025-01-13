import { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { appRoutes } from "../config/routesConfig";
import Error404 from "../pages/error/Error404";
import { DefaultLayout } from "../layouts/DefaultLayout";

const Routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [{ children: appRoutes.GUEST }],
  },
  {
    element: <ProtectedRoute allowedRoles={["admin", "user"]} />,
    children: [
      {
        children: appRoutes.PROTECTED,
      },
    ],
  },

  { path: "*", element: <Error404 /> },
];

export default Routes;
