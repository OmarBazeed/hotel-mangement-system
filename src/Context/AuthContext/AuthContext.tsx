/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
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

export interface userInfo {
  _id: string;
  userName: string;
  email: string;
  country: string;
  phoneNumber: number;
  profileImage: string;
  createdAt: string;
}
export interface IAuth {
  loginData: { role: string } | null;
  savLoginData: () => void;
  logOut: () => void;
  requestHeaders: { Authorization: string };
  favsNumber: number;
  setFavsNumber: Dispatch<SetStateAction<number>>;
  userInfo: userInfo;
}

export const AuthContext = createContext<IAuth | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loginData, setLoginData] = useState<{ role: string } | null>(null);
  const [userInfo, setUserInfo] = useState<userInfo>({});
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
  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/admin/users/${loginData?._id}`,
        {
          headers: requestHeaders,
        }
      );
      setUserInfo(data.data.user);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      savLoginData();
      getUser();
    }
    localStorage.setItem("favsNumber", favsNumber.toString());
  }, [favsNumber, loginData?._id]);

  const contextValue: IAuth = {
    loginData,
    savLoginData,
    requestHeaders,
    logOut,
    favsNumber,
    setFavsNumber,
    userInfo,
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
