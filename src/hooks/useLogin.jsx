import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancel, setIsCancel] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // update context
      dispatch({ type: "LOGIN", payload: res.user });

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

  return { login, isPending, error };
};
