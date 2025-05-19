import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../auth.service";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
