import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  nextStep: string;
};

const NextButton = ({ nextStep }: Props) => {
  const router = useRouter();
  const onClickNextPage = () => {
    if (nextStep === "finish") {
      router.push("/products");
      return;
    }
    router.push(`/products/add?step=${nextStep}`);
  };
  return (
    <div className="absolute bottom-0 left-0 bg-white shadow-xl w-full h-auto py-3 flex justify-end p-4 gap-3">
      <button className="border border-blue-600 w-24 h-9 text-blue-600">
        Cancel
      </button>
      <button
        className="bg-blue-600 w-24 h-9 text-white"
        onClick={onClickNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default NextButton;
