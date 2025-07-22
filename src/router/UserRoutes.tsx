import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const NotImplemented = lazy(() => import("@/pages/NotImplemented"));

export const USER_ROUTES: RouteObject[] = [
  { path: ROUTES.PROFILE, element: <NotImplemented /> },
  { path: ROUTES.MANAGE, element: <NotImplemented /> },
  { path: ROUTES.HISTORY, element: <NotImplemented /> },
];
