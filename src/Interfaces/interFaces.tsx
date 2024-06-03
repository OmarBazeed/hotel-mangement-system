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
