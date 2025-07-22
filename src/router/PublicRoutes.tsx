import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Contact = lazy(() => import("@/pages/Contact"));
const Auth = lazy(() => import("@/pages/auth/Auth"));
const BookNow = lazy(() => import("@/pages/BookNow"));
const Rates = lazy(() => import("@/pages/Rates"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const Schedule = lazy(() => import("@/pages/Schedule"));
const TermsAndPrivacy = lazy(() => import("@/pages/TermsAndPrivacy"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const NotImplemented = lazy(() => import("@/pages/NotImplemented"));

export const PUBLIC_ROUTES: RouteObject[] = [
  { path: ROUTES.AUTH, element: <Auth /> },
  { path: ROUTES.BOOK, element: <BookNow /> },
  { path: ROUTES.CONTACT, element: <Contact /> },
  { path: ROUTES.COOKIES, element: <NotImplemented /> },
  { path: ROUTES.DOCUMENTATION, element: <NotImplemented /> },
  { path: ROUTES.DROP_OFF, element: <NotImplemented /> },
  { path: ROUTES.FAQ, element: <NotImplemented /> },
  { path: ROUTES.FOLLOW, element: <NotImplemented /> },
  { path: ROUTES.JOBS, element: <NotImplemented /> },
  { path: ROUTES.RATES, element: <Rates /> },
  { path: ROUTES.RESET_PASSWORD, element: <ResetPassword /> },
  { path: ROUTES.SCHEDULE, element: <Schedule /> },
  { path: ROUTES.SETTING, element: <NotImplemented /> },
  { path: ROUTES.TERMS_AND_PRIVACY, element: <TermsAndPrivacy /> },
  { path: ROUTES.TOS, element: <NotImplemented /> },
  { path: "*", element: <PageNotFound /> },
];
