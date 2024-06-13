/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export interface IAuth {
  loginData: { role: string } | null;
  savLoginData: () => void;
  logOut: () => void;
  requestHeaders: { Authorization: string };
  favsNumber: number;
  setFavsNumber: Dispatch<SetStateAction<number>>;
}

export const AuthContext = createContext<IAuth | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loginData, setLoginData] = useState<{ role: string } | null>(null);
  const [favsNumber, setFavsNumber] = useState(() => {
    const storedFavsNumber = localStorage.getItem("favsNumber");
    return storedFavsNumber ? parseInt(storedFavsNumber, 10) : 0;
  });

  const requestHeaders = {
    Authorization: `${localStorage.getItem("token")}`,
  };

  const savLoginData = () => {
    const encodedToken = localStorage.getItem("token");
    if (!encodedToken) throw new Error("token not found");

    const decodedToken = jwtDecode(encodedToken) as { role: string };
    setLoginData(decodedToken);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setLoginData(null);
    setFavsNumber(0);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      savLoginData();
    }
    localStorage.setItem("favsNumber", favsNumber.toString());
  }, [favsNumber]);

  const contextValue: IAuth = {
    loginData,
    savLoginData,
    requestHeaders,
    logOut,
    favsNumber,
    setFavsNumber,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): IAuth => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
