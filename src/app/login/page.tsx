import { useLoginMutation } from "@/query/useAuthQuery";

export default function Page() {
  const { mutate: login } = useLoginMutation();

  const submit = async () => {
    login(
      {
        email: "",
        password: "",
      },
      {
        onSuccess: () => {
          console.log("success");
        },
        onError: () => {
          console.log("error");
        },
      }
    );
  };

  return <div>Login</div>;
}
