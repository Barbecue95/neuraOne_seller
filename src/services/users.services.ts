import { User, UserSortOption } from "@/types/users.types";
import axiosClient from "./axiosClient";
import { userEndpoints } from "./constants/apiEndpoints";

interface GetUsersParams {
  sort?: UserSortOption;
  page?: number;
  limit?: number;
  searchText?: string;
}

export const registerUser = async (payload: Partial<User>) => {
  const res = await axiosClient.post(userEndpoints.register, payload);
  return res.data;
};

export const getUsers = async (params?: GetUsersParams) => {
  const queryParams = new URLSearchParams();

  if (params?.sort) {
    queryParams.append("sortBy", params.sort);
  }
  if (params?.page) {
    queryParams.append("page", params.page.toString());
  }
  if (params?.limit) {
    queryParams.append("limit", params.limit.toString());
  }
  if (params?.searchText) {
    queryParams.append("searchText", params.searchText);
  }

  const query = queryParams.toString();
  const url = query ? `${userEndpoints.users}/?${query}` : userEndpoints.users;

  const res = await axiosClient.get(url);
  return res.data;
};

export const getUserById = async (id: string) => {
  const res = await axiosClient.get(`${userEndpoints.users}/${id}`);
  return res.data;
};

export const getDeleteUser = async (id: string) => {
  const res = await axiosClient.delete(`${userEndpoints.users}/${id}`);
  return res.data;
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await axiosClient.post(userEndpoints.refreshToken, {
    refreshToken: refreshToken,
  });
  return res.data;
};
