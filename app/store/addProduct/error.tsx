"use client";

import ErrorPage from "@/components/ErrorPage";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex relative">
      <ErrorPage error={error} reset={reset} />
    </div>
  );
}
