import { useEffect, useReducer, useState } from "react";
import { projectFirestore } from "../firebase/config";

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
      return { document: null, success: false, error: action.payload, isPending: false };
    case "ADD_DOCUMENT":
      return { document: action.payload, success: true, error: false, isPending: false };
    case "DELETE_DOCUMENT":
      return { document: null, success: true, error: false, isPending: false };
    case "UPDATE_DOCUMENT":
      return { document: action.payload, success: true, error: false, isPending: false };
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

  // add document
  const addDocument = async (doc) => {
    dispatch({ type: "PENDING" });

    try {
      const document = await ref.add({ ...doc });
      dispatchIfNotCanceled({ type: "ADD_DOCUMENT", payload: document });
    } catch (err) {
      dispatchIfNotCanceled({ type: "ERROR", payload: `could not add ${err}` });
    }
  };

  // delete document
  const deleteDocument = async (id) => {
    dispatch({ type: "PENDING" });

    try {
      const deleteDocument = await ref.doc(id).delete();
      dispatchIfNotCanceled({ type: "DELETE_DOCUMENT", payload: deleteDocument });
    } catch (err) {
      dispatchIfNotCanceled({ type: "ERROR", payload: "could not delete" + err });
    }
  };

  // update document
  const updateDocument = async (id, updates) => {
    dispatch({ type: "PENDING" });

    try {
      const updateDocument = ref.doc(id).update(updates);
      dispatchIfNotCanceled({ type: "UPDATE_DOCUMENT", payload: updateDocument });
      return updateDocument;
    } catch (err) {
      dispatchIfNotCanceled({ type: "ERROR", payload: "could not delete" + err });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
