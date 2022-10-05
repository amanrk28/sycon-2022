import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';

interface AuthContextInterface {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => void;
  addUserDetail: (user: User, name: string) => Promise<void>;
}

const ctxValues: AuthContextInterface = {
  currentUser: null,
  login: (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  signup: (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },
  logout: () => {
    return signOut(auth);
  },
  addUserDetail: (user: User, name: string) => {
    return updateProfile(user, { displayName: name });
  },
};

const AuthContext = createContext<AuthContextInterface | null>(ctxValues);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'This component must be used within a AuthContext.Provider'
    );
  }

  return context;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ ...ctxValues, currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
