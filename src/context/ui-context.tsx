import { createContext, ReactNode, useState } from "react";

interface UiContextType {
  isNavOpen: boolean;
  toggleNav: () => void;
  isUserMenuOpen: boolean;
  toggleUserMenu: () => void;
  theme: string;
  toggleTheme: () => void;
}

const initialUiContextState = {
  isNavOpen: false,
  toggleNav: () => {},
  isUserMenuOpen: false,
  toggleUserMenu: () => {},
  theme: "light",
  toggleTheme: () => {},
};

export const UiContext = createContext<UiContextType>(initialUiContextState);

export function UiContextProvider({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserMenuOpen, setisUserMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleNav = () => {
    setIsNavOpen((prevNavState) => {
      if (!prevNavState) {
        setisUserMenuOpen(false);
      }
      return !prevNavState;
    });
  };

  const toggleUserMenu = () => {
    setisUserMenuOpen((prevUserMenuState) => {
      if (!prevUserMenuState) {
        setIsNavOpen(false);
      }
      return !prevUserMenuState;
    });
  };

  const toggleTheme = () =>
    setTheme((prevThemeState) =>
      prevThemeState === "light" ? "dark" : "light",
    );

  const uiContext = {
    isNavOpen,
    isUserMenuOpen,
    theme,
    toggleNav,
    toggleUserMenu,
    toggleTheme,
  };

  return <UiContext.Provider value={uiContext}>{children}</UiContext.Provider>;
}
