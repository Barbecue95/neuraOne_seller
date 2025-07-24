import axiosClient from "./axiosClient";
import { userEndpoints } from "./constants/apiEndpoints";

export const login = async (payload: { email: string;  password: string}) => {
    const { data } = await axiosClient.post(userEndpoints.login, payload)
    return data;
}