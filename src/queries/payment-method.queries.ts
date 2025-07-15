import { 
  createPaymentMethod, 
  getPaymentMethods, 
  updatePaymentMethod, 
  deletePaymentMethod, 
  getPaymentMethodById,
  // Legacy imports for backward compatibility
  createBank, 
  getBanks, 
  updateBank, 
  deleteBank, 
  getBankById 
} from "@/services/payment-method.services";
import { CreateUpdatePaymentMethodPayload, CreateUpdateBankPayload } from "@/types/payment-method.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// New payment method hooks
export const useGetPaymentMethods = () => {
  return useQuery({
    queryKey: ["PaymentMethods"],
    queryFn: () => getPaymentMethods(),
  });
};

export const useCreatePaymentMethod = (form: { reset: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUpdatePaymentMethodPayload) => createPaymentMethod(payload),
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["PaymentMethods"] });
    },
  });
};

export const useGetPaymentMethodById = (id: number) => {
  return useQuery({
    queryKey: ["PaymentMethod", id],
    queryFn: () => getPaymentMethodById(id),
    enabled: !!id,
  });
};

export const useUpdatePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      id,
    }: {
      payload: CreateUpdatePaymentMethodPayload;
      id: number;
    }) => updatePaymentMethod({ payload, id }),
    onSuccess: (data, variables) => {
      // Invalidate both the payment methods list and the specific payment method
      queryClient.invalidateQueries({ queryKey: ["PaymentMethods"] });
      queryClient.invalidateQueries({ queryKey: ["PaymentMethod", variables.id] });
    },
  });
};

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PaymentMethods"] });
    },
  });
};

// Legacy bank hooks for backward compatibility
/** @deprecated Use useGetPaymentMethods instead */
export const useGetBanks = () => {
  return useQuery({
    queryKey: ["Banks"],
    queryFn: () => getBanks(),
  });
};

/** @deprecated Use useCreatePaymentMethod instead */
export const useCreateBank = (form: { reset: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUpdateBankPayload) => createBank(payload),
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["Banks"] });
    },
  });
};

/** @deprecated Use useGetPaymentMethodById instead */
export const useGetBankById = (id: number) => {
  return useQuery({
    queryKey: ["Bank", id],
    queryFn: () => getBankById(id),
    enabled: !!id,
  });
};

/** @deprecated Use useUpdatePaymentMethod instead */
export const useUpdateBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      id,
    }: {
      payload: CreateUpdateBankPayload;
      id: number;
    }) => updateBank({ payload, id }),
    onSuccess: (data, variables) => {
      // Invalidate both the banks list and the specific bank
      queryClient.invalidateQueries({ queryKey: ["Banks"] });
      queryClient.invalidateQueries({ queryKey: ["Bank", variables.id] });
    },
  });
};

/** @deprecated Use useDeletePaymentMethod instead */
export const useDeleteBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBank(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Banks"] });
    },
  });
};
