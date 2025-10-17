import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancel, setIsCancel] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setIsPending(true);
    setError(null);

    try {
      await projectAuth.signOut();

      // update context
      dispatch({ type: "LOGOUT" });

      if (!isCancel) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancel) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  // clean up
  useEffect(() => {
    return () => setIsCancel(true);
  }, []);

  return { logout, isPending, error };
};
