import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useSignup() {
  const [isCancel, setIsCancel] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    // remove previous error
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);
      if (!res) {
        // maybe internet error
        throw new Error("Could not complete signup");
      }
      // add display name to user
      await res.user.updateProfile({ displayName });

      // dispatch login
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

  return { error, isPending, signup };
}
