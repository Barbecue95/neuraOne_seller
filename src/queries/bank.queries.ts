import { createBank, getBanks } from "@/services/bank.services";
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
