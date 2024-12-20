'use client'
import { useSession } from "next-auth/react";

interface SessionStatuses {
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const useSessionStatus = (): SessionStatuses => {
  const { status } = useSession();
  console.log("from useSessionStatus", {status})
  return {
    isLoading: status === "loading",
    isLoggedIn: status === "authenticated",
  };
};
