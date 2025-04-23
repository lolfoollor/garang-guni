import { createContext, ReactNode, useState } from "react";

interface UiContextType {
  isNavOpen: boolean;
  toggleNav: () => void;
  isUserPanelOpen: boolean;
  toggleUserPanel: () => void;
  theme: string;
  toggleTheme: () => void;
}

const initialUiContextState = {
  isNavOpen: false,
  toggleNav: () => {},
  isUserPanelOpen: false,
  toggleUserPanel: () => {},
  theme: "light",
  toggleTheme: () => {},
};

export const UiContext = createContext<UiContextType>(initialUiContextState);

export function UiContextProvider({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserPanelOpen, setisUserPanelOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleNav = () => {
    setIsNavOpen((prevNavState) => {
      if (!prevNavState) {
        setisUserPanelOpen(false);
      }
      return !prevNavState;
    });
  };

  const toggleUserPanel = () => {
    setisUserPanelOpen((prevUserPanelState) => {
      if (!prevUserPanelState) {
        setIsNavOpen(false);
      }
      return !prevUserPanelState;
    });
  };

  const toggleTheme = () =>
    setTheme((prevThemeState) =>
      prevThemeState === "light" ? "dark" : "light",
    );

  const uiContext = {
    isNavOpen,
    isUserPanelOpen,
    theme,
    toggleNav,
    toggleUserPanel,
    toggleTheme,
  };

  return <UiContext.Provider value={uiContext}>{children}</UiContext.Provider>;
}
