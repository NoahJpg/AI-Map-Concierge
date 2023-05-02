import { useState } from "react";
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"



export const UseSignIn = (email, password) => {
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.error(err);
    }
  };
  return signIn;
};

export const UseSignInWithGoogle = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      console.error(err);
    }
  };
  return signInWithGoogle;
};

export const UseLogout = () => {
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};