import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: null,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return { isPending: true, error: null, document: null, success: null };
    case "ERROR":
      return { document: null, error: action.payload, isPending: false, success: false };
    case "ADD_DOCUMENT":
      return { document: action.payload, success: true, error: false, isPending: false };
    case "DELETE_DOCUMENT":
      return { document: null, success: true, error: false, isPending: false };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCanceled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add transaction
  const addTransaction = async (doc) => {
    dispatch({ type: "PENDING" });

    try {
      const createAt = timestamp.fromDate(new Date());
      const document = await ref.add({ ...doc, createAt });
      dispatchIfNotCanceled({ type: "ADD_DOCUMENT", payload: document });
    } catch (err) {
      dispatchIfNotCanceled({ type: "ERROR", payload: "could not add" });
    }
  };

  // delete transaction
  const deleteTransaction = async (id) => {
    dispatch({ type: "PENDING" });

    try {
      const deleteDocument = await ref.doc(id).delete();
      dispatchIfNotCanceled({ type: "DELETE_DOCUMENT", payload: deleteDocument });
    } catch (err) {
      dispatchIfNotCanceled({ type: "ERROR", payload: "could not delete" + err });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addTransaction, deleteTransaction, response };
};
