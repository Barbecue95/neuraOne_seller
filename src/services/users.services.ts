import { User, UserSortOption } from "@/types/users.types";
import axios from "axios";

// Dummy of a service function
const userInstance = axios.create({
  baseURL: "http://localhost:300/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export default userInstance;

interface GetUsersParams {
  sort?: UserSortOption;
  page?: number;
  limit?: number;
  searchText?: string;
}

export const registerUser = async (payload: Partial<User>) => {
  const res = await userInstance.post("/register", payload);
  return res.data;
};

export const getUsers = async (params?: GetUsersParams) => {
  const queryParams = new URLSearchParams();
  
  if (params?.sort) {
    queryParams.append('sortBy', params.sort);
  }
  if (params?.page) {
    queryParams.append('page', params.page.toString());
  }
  if (params?.limit) {
    queryParams.append('limit', params.limit.toString());
  }
  if (params?.searchText) {
    queryParams.append('searchText', params.searchText);
  }

  const query = queryParams.toString();
  const url = query ? `/?${query}` : '/';
  
  const res = await userInstance.get(url);
  return res.data;
};

export const getUserById = async (id: string) => {
  const res = await userInstance.get(`/${id}`);
  return res.data;
};

export const getDeleteUser= async (id: string) => {
  const res = await userInstance.delete(`/${id}`);
  return res.data;
};
