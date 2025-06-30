import { CreateUpdateBankPayload } from "@/types/bank.types";
import axiosClient from "./axiosClient";
import { bankEndpoints } from "./constants/apiEndpoints";

export const getBanks = async () => {
  const res = await axiosClient.get(bankEndpoints.banks);
  return res.data;
};

export const createBank = async (payload: CreateUpdateBankPayload) => {
  console.log("Come here");
  const res = await axiosClient.post(bankEndpoints.banks, payload);
  return res.data.data;
};
