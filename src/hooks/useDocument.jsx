import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("no search document exits")
        }
      },
      (err) => {
        console.log(err);
        setError("could not fetch document (useDocument)");
      }
    );

    // clean up
    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
};
