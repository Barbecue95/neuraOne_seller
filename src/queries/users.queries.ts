import { getUserById, getUsers, registerUser } from "@/services/users.services";
import { User, UserSortOption } from "@/types/users.types";
import { useMutation, useQuery } from "@tanstack/react-query";

interface UseUsersParams {
  sort?: UserSortOption;
  page?: number;
  limit?: number;
  search?: string;
}

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (payload: Partial<User>) => registerUser(payload),
  });
};

export const useUsers = (params?: UseUsersParams) => {
  return useQuery({
    queryKey: ["Users", params],
    queryFn: () => getUsers(params),
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["User", id],
    queryFn: () => getUserById(id),
  });
};
