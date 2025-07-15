import { CreateUpdatePaymentMethodPayload, CreateUpdateBankPayload } from "@/types/payment-method.types";
import axiosClient from "./axiosClient";
import { paymentMethodEndpoints, bankEndpoints } from "./constants/apiEndpoints";

// New payment method services
export const getPaymentMethods = async () => {
  const res = await axiosClient.get(paymentMethodEndpoints.paymentMethods);
  return res.data;
};

export const createPaymentMethod = async (payload: CreateUpdatePaymentMethodPayload) => {
  const res = await axiosClient.post(paymentMethodEndpoints.paymentMethods, payload);
  return res.data.data;
};

export const updatePaymentMethod = async ({
  payload,
  id,
}: {
  payload: CreateUpdatePaymentMethodPayload;
  id: number;
}) => {
  const res = await axiosClient.put(`${paymentMethodEndpoints.paymentMethods}/${id}`, payload);
  return res.data.data;
};

export const deletePaymentMethod = async (id: number) => {
  const res = await axiosClient.delete(`${paymentMethodEndpoints.paymentMethods}/${id}`);
  return res.data;
};

export const getPaymentMethodById = async (id: number) => {
  const res = await axiosClient.get(`${paymentMethodEndpoints.paymentMethods}/${id}`);
  return res.data;
};

// Legacy bank services for backward compatibility
/** @deprecated Use getPaymentMethods instead */
export const getBanks = async () => {
  const res = await axiosClient.get(bankEndpoints.banks);
  return res.data;
};

/** @deprecated Use createPaymentMethod instead */
export const createBank = async (payload: CreateUpdateBankPayload) => {
  const res = await axiosClient.post(bankEndpoints.banks, payload);
  return res.data.data;
};

/** @deprecated Use updatePaymentMethod instead */
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

/** @deprecated Use deletePaymentMethod instead */
export const deleteBank = async (id: number) => {
  const res = await axiosClient.delete(`${bankEndpoints.banks}/${id}`);
  return res.data;
};

/** @deprecated Use getPaymentMethodById instead */
export const getBankById = async (id: number) => {
  const res = await axiosClient.get(`${bankEndpoints.banks}/${id}`);
  return res.data;
};
