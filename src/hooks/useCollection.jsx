import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [isPending, setIsPending] = useState(false)
  const [documents, setDocuments] = useState();
  const [error, setError] = useState();

  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    setIsPending(true)

    let ref = projectFirestore.collection(collection)

    if(query){
      ref = ref.where(...query)
    }

    if(orderBy){
      ref = ref.orderBy(...orderBy)
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update documents state
        setDocuments(results);
        setError(null);
        setIsPending(false)
      },
      (err) => {
        setError(err.message);
        console.log("could not fetch the data");
      }
    );

    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, error, isPending };
};
