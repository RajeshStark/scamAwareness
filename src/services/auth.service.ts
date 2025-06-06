import { Api } from "./api/Apis";
import { ApiResponse, http } from "./api/http-client";

type LoginPayload = {
  email: string;
  password: string;
  userType: number;
  fcmToken?: string;
};

type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  userType: number;
};

type UpdateProfilePayload = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  userType: number;
  coverPicture?: string;
  description?: string;
  fcmToken?: string;
  notificationStatus?: boolean;
  profilePicture?: string;
};

type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

type ForgotPasswordPayload = {
  email: string;
  userType: number;
};

export const loginUser = async (payload: LoginPayload) => {
  const response = await http.post<ApiResponse<any>>(Api.LOGIN, payload);
  return response.data;
};

export const getProfile = async () => {
  const response = await http.get<ApiResponse<any>>(Api.GET_PROFILE);

  return response.data;
};

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const response = await http.post<ApiResponse<any>>(
    Api.UPDATE_PROFILE,
    payload
  );
  return response.data;
};

export const signupUser = async (payload: SignupPayload) => {
  const response = await http.post<ApiResponse<any>>(Api.SIGNUP, payload);
  return response.data;
};

export const changePassword = async (payload: ChangePasswordPayload) => {
  const response = await http.post<ApiResponse<any>>(
    Api.CHANGE_PASSWORD,
    payload
  );
  return response.data;
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const response = await http.post<ApiResponse<any>>(
    Api.FORGOT_PASSWORD,
    payload
  );
  return response.data;
};

export const verifyOtp = async (payload: ForgotPasswordPayload) => {
  const response = await http.post<ApiResponse<any>>(Api.VERIFY_OTP, payload);
  return response.data;
};

export const resendOtp = async (payload: ForgotPasswordPayload) => {
  const response = await http.post<ApiResponse<any>>(Api.RESEND_OTP, payload);
  return response.data;
};
