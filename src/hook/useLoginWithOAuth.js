import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";

export const useLoginWithOAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  const login = async (providerName) => {
    setError(null);
    setIsPending(true);
    
    let provider;
    if (providerName === "google") {
      provider = new GoogleAuthProvider();
    } else if (providerName === "github") {
      provider = new GithubAuthProvider();
    } else if (providerName === "facebook") {
      provider = new FacebookAuthProvider();
    } else {
      setError("Unsupported provider");
      setIsPending(false);
      return;
    }

    try {
      const res = await signInWithPopup(auth, provider);
      console.log(`${providerName} user:`, res.user);
      setIsPending(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsPending(false);
    }
  };

  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      await signOut(auth);
      setIsPending(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsPending(false);
    }
  };
  
  return { login, logout, user, error, isPending };
};

