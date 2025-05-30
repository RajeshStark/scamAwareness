import { useMutation } from "@tanstack/react-query";
import { search } from "../explore.service";

export const useSearch = () => {
  return useMutation({
    mutationFn: search,
  });
};
