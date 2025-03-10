import { useMutation } from "@tanstack/react-query";
import { login } from "../service/authService";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};
