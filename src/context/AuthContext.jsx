import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "usuarios", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        const rol =
          userDocSnap.exists() && userDocSnap.data().rol === "admin"
            ? "admin"
            : "user";
        setUser({ ...currentUser, rol });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
