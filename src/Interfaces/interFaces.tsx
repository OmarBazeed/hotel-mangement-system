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

export interface FacilitiesInterface {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy: { userName: string; _id: string };
}
export interface UsersInterface {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  country: string;
  profileImage: string;
}

export interface facilitiesForm {
  name: string;
}

export interface IBookingStatus {
  pending: number;
  completed: number;
}
export interface IUsers {
  adminsCount: number;
  usersCount: number;
  user: number;
  admin: number;
}

export interface AuthContextType {
  saveAdminData: () => void;
  userRole: string | null;
  token: string | null;
  logout: () => void;
  userData: string | null;
}

export interface Charts {
  rooms: number;
  facilities: number;
  ads: number;
  bookings: IBookingStatus;
  users: IUsers;
}

export interface RoomsInterface {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: [{ name: string; _id: string }];
  createdAt: string;
  updatedAt: string;
  createdBy: { userName: string; _id: string };
  images: [];
}

export interface CreateRoom {
  roomNumber: string;
  imgs: [];
  price: string;
  capacity: string;
  discount: string;
  facilities: [];
}
