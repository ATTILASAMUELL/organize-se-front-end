import { User } from "../../types/User";
import { createContext, Dispatch, SetStateAction } from 'react';

export type AuthContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    signin: (email: string, password: string) => Promise<any>;
    signout: () => void;
    register: (name: string, email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>(null!);
