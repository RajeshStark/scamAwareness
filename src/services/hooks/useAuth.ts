import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser } from "../auth.service";

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
