export interface FormData {
  email: string;
  password: string;
  loginData: string;
}

export interface RegisterFormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  country: string;
  role: string;
  profileImage: FileList;
}
export interface ResetPassInterFace {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}

import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  window?: () => Window;
}

export interface SideBarProps {
  open: boolean;
}
export interface DashlayoutProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export interface IBookingStatus {
  pending: number;
  completed: number;
}
export interface IUsers {
  adminsCount: number;
  usersCount: number;
}

export interface AuthContextType {
  saveAdminData: () => void;
  userRole: string | null;
  token: string | null;
  logout: () => void;
  userData: string | null;
}

export interface ICharts {
  rooms: number;
  facilities: number;
  ads: number;
  bookings: IBookingStatus;
  users: IUsers;
}