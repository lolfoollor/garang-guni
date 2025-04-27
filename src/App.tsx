import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./layouts/RootLayout.tsx";
import Welcome from "./pages/Welcome.jsx";
import Contact from "./pages/Contact.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import BookNow from "./pages/BookNow.jsx";
import List from "./pages/List.jsx";
import Schedule from "./pages/Schedule.jsx";

import { UserContextProvider } from "./context/user-context.js";
import TermsAndPrivacy from "./pages/TermsAndPrivacy.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import NotImplemented from "./pages/NotImplemented.jsx";
import NavBar from "./components/NavBar.tsx";
import { UiContextProvider } from "./context/ui-context.tsx";
import { ROUTES } from "./constants/routes.ts";

const ROOT_CHILDREN_ROUTES = [
  { path: ROUTES.AUTH, element: <Auth /> },
  { path: ROUTES.BOOK, element: <BookNow /> },
  { path: ROUTES.CONTACT, element: <Contact /> },
  { path: ROUTES.COOKIES, element: <NotImplemented /> },
  { path: ROUTES.DOCUMENTATION, element: <NotImplemented /> },
  { path: ROUTES.DROP_OFF, element: <NotImplemented /> },
  { path: ROUTES.FAQ, element: <NotImplemented /> },
  { path: ROUTES.FOLLOW, element: <NotImplemented /> },
  { path: ROUTES.HISTORY, element: <NotImplemented /> },
  { path: ROUTES.JOBS, element: <NotImplemented /> },
  { path: ROUTES.LIST, element: <List /> },
  { path: ROUTES.PROFILE, element: <NotImplemented /> },
  { path: ROUTES.SCHEDULE, element: <Schedule /> },
  { path: ROUTES.SETTING, element: <NotImplemented /> },
  { path: ROUTES.TERMS_AND_PRIVACY, element: <TermsAndPrivacy /> },
  { path: ROUTES.TOS, element: <NotImplemented /> },
  { path: "*", element: <PageNotFound /> },
];

function App() {
  return (
    <UserContextProvider>
      <UiContextProvider>
        <BrowserRouter>
          <div className="appContainer">
            <NavBar />
            <div className="app">
              <Routes>
                <Route path={ROUTES.HOME} element={<RootLayout />}>
                  <Route index element={<Welcome />} />
                  {ROOT_CHILDREN_ROUTES.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                </Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </UiContextProvider>
    </UserContextProvider>
  );
}

export default App;
