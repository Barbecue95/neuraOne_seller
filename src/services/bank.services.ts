import { CreateUpdateBankPayload } from "@/types/bank.types";
import axiosClient from "./axiosClient";
import { bankEndpoints } from "./constants/apiEndpoints";

export const getBanks = async () => {
  const res = await axiosClient.get(bankEndpoints.banks);
  return res.data;
};

export const createBank = async (payload: CreateUpdateBankPayload) => {
  const res = await axiosClient.post(bankEndpoints.banks, payload);
  return res.data.data;
};

export const updateBank = async ({
  payload,
  id,
}: {
  payload: CreateUpdateBankPayload;
  id: number;
}) => {
  const res = await axiosClient.put(`${bankEndpoints.banks}/${id}`, payload);
  return res.data.data;
};

export const deleteBank = async (id: number) => {
  const res = await axiosClient.delete(`${bankEndpoints.banks}/${id}`);
  return res.data;
};

export const getBankById = async (id: number) => {
  const res = await axiosClient.get(`${bankEndpoints.banks}/${id}`);
  return res.data;
};
