import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  getProfile,
  loginUser,
  resendOtp,
  signupUser,
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
  return useMutation({
    mutationFn: getProfile,
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtp,
  });
};
