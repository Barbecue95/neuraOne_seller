import { login } from "@/services/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { setUserInfo } from "@/store/slices/auth.slice";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogin = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return useMutation(
        {
            mutationFn: (payload: { email: string; password: string }) => login(payload),
            onSuccess: (res) => {
                dispatch(setUserInfo(res));
                router.push("/");
            }
        }
    )
}