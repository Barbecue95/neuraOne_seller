import { createBank, getBanks, updateBank, deleteBank, getBankById } from "@/services/bank.services";
import { CreateUpdateBankPayload } from "@/types/bank.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBanks = () => {
  return useQuery({
    queryKey: ["Banks"],
    queryFn: () => getBanks(),
  });
};

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

export const useGetBankById = (id: number) => {
  return useQuery({
    queryKey: ["Bank", id],
    queryFn: () => getBankById(id),
    enabled: !!id,
  });
};

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

export const useDeleteBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBank(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Banks"] });
    },
  });
};
