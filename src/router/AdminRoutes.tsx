import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const NotImplemented = lazy(() => import("@/pages/NotImplemented"));

export const ADMIN_ROUTES: RouteObject[] = [
  { path: ROUTES.PROFILE, element: <NotImplemented /> },
];
