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
  loginData: { role: string; _id: string } | null;
  savLoginData: () => void;
  logOut: () => void;
  requestHeaders: { Authorization: string };
  // other common variables
  favsNumber: number;
  setFavsNumber: Dispatch<SetStateAction<number>>;
  bookingId: string;
  setBookingId: Dispatch<SetStateAction<string>>;
  subtotal: string | number;
  setSubtotal: Dispatch<SetStateAction<number | string>>;
}

export const AuthContext = createContext<IAuth | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loginData, setLoginData] = useState<{ role: string } | null>(null);

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

  const [favsNumber, setFavsNumber] = useState(() => {
    const storedFavsNumber = localStorage.getItem("favsNumber");
    return storedFavsNumber ? parseInt(storedFavsNumber, 10) : 0;
  });
  const [bookingId, setBookingId] = useState(() => {
    const storedBookingId = localStorage.getItem("bookingId");
    return storedBookingId ? storedBookingId : "";
  });
  const [subtotal, setSubtotal] = useState(() => {
    const storedSubtotal = localStorage.getItem("subtotal");
    return storedSubtotal ? storedSubtotal : 0;
  });

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
    bookingId,
    setBookingId,
    subtotal,
    setSubtotal,
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
