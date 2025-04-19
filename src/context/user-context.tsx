import { createContext, ReactNode, useState } from "react";

interface UserContextType {
  credentials: {
    id: number | null;
    createdAt: string;
    firstName: string;
    lastname: string;
    email: string;
    password: string;
    mobileNumber: string;
    gender: string;
    dob: string;
    postalCode: string | null;
    address: string;
    floor: string | null;
    unitNumber: string | null;
  };
  isLoggedIn: boolean;
  handleLogin: (userData: UserContextType["credentials"]) => void;
  handleLogout: () => void;
}

const initialContextState = {
  credentials: {
    id: null,
    createdAt: "",
    firstName: "",
    lastname: "",
    email: "",
    password: "",
    mobileNumber: "",
    gender: "",
    dob: "",
    postalCode: null,
    address: "",
    floor: null,
    unitNumber: null,
  },
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {},
};

export const UserContext = createContext<UserContextType>(initialContextState);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentials] = useState<
    UserContextType["credentials"]
  >(initialContextState["credentials"]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    initialContextState["isLoggedIn"],
  );

  const handleLogin = (userData: UserContextType["credentials"]) => {
    setIsLoggedIn(true);
    setCredentials(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials(initialContextState["credentials"]);
  };

  const userContext = {
    credentials,
    isLoggedIn,
    handleLogin,
    handleLogout,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}
