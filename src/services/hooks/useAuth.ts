import { useMutation, useQuery } from "@tanstack/react-query";
import {
  changePassword,
  forgotPassword,
  getProfile,
  loginUser,
  resendOtp,
  signupUser,
  updateProfile,
  verifyOtp,
} from "../auth.service";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signupUser,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};

export const useVerify = () => {
  return useMutation({
    mutationFn: verifyOtp,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    select: (data) => data.output?.[0],
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtp,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};
