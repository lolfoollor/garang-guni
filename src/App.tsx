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
import { useState } from "react";
import { UiContextProvider } from "./context/ui-context.tsx";

const ROOT_CHILDREN_ROUTES = [
  { path: "auth", element: <Auth /> },
  { path: "book", element: <BookNow /> },
  { path: "contact", element: <Contact /> },
  { path: "faq", element: <NotImplemented /> },
  { path: "follow", element: <NotImplemented /> },
  { path: "jobs", element: <NotImplemented /> },
  { path: "profile", element: <NotImplemented /> },
  { path: "setting", element: <NotImplemented /> },
  { path: "list", element: <List /> },
  { path: "schedule", element: <Schedule /> },
  { path: "terms-and-privacy", element: <TermsAndPrivacy /> },
  { path: "*", element: <PageNotFound /> },
];

function App() {
  const [showModal, setShowModal] = useState<boolean>(true);

  const toggleNavBar = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <UserContextProvider>
      <UiContextProvider>
        <BrowserRouter>
          <div className="appContainer">
            <NavBar isNavBarOpen={showModal} toggleNavBar={toggleNavBar} />
            <div className="app">
              <Routes>
                <Route path="/" element={<RootLayout />}>
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
