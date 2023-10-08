"use client";

import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="border-2 border-accent mt-4 px-4 py-1 rounded-full transition duration-200 hover:bg-slate-200"
    >
      Go back
    </button>
  );
};

export default GoBackButton;
