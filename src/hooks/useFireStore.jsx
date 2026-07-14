import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../Firebase";

//✅ Hook to get a collection
export function useGetCollection(collectionName, _q) {
  const qRef = useRef(_q).current;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const ref = collection(db, collectionName);

    let queries = [];
    if (qRef) {
      queries.push(where(...qRef));
    }
    queries.push(orderBy("date", "desc"));

    const q = query(ref, ...queries);

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          setError("No Result Found!");
          setData([]);
        } else {
          const documents = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(documents);
          setError("");
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );

    return () => unsub();
  }, [collectionName, qRef]);

  return { error, loading, data };
}

// ✅ Hook to get a single document
export function useGetDocument(collectionName, id) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const ref = doc(db, collectionName, id);

    const unsub = onSnapshot(
      ref,
      (docSnap) => {
        if (!docSnap.exists()) {
          setError("No Result Found!");
          setData(null);
        } else {
          setData({ id: docSnap.id, ...docSnap.data() });
          setError("");
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );

    return () => unsub();
  }, [collectionName, id]);

  return { error, loading, data };
}

// ✅ Simple Firestore functions (no hooks needed)
export async function addCollection(collectionName, data) {
  data.date = serverTimestamp();
  const ref = collection(db, collectionName);
  return addDoc(ref, data);
}

export async function deleteDocument(collectionName, id) {
  const ref = doc(db, collectionName, id);
  return deleteDoc(ref);
}

export async function updateDocument(collectionName, id, data) {
  const ref = doc(db, collectionName, id);
  return updateDoc(ref, data);
}
