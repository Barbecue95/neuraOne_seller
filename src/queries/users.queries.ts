import { getUsers } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
// Dummy of a query function

export const useUsers = () => {
  return useQuery({
    queryKey: ["Users"],
    queryFn: getUsers,
  });
};
