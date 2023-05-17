import { useState, useEffect } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setUser(user)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isAuthenticated,
    user,
    setIsAuthenticated,
  };
};

export const UseSignUp = (email, password) => {

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      alert("Check Your Email/Password")
    }
  };
  return signUp
};

export const UseSignIn = (email, password) => {

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      alert("Check Your Login Information") 
    }
  };
  return signIn
};

export const UseSignInWithGoogle = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      alert("Something is wrong with your Google Account")
    }
  };
  return signInWithGoogle
};

export const UseLogout = () => {
  
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      alert(err)
    }
  };
  return logout;
};