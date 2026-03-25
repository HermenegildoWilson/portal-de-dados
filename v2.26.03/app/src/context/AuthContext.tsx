import type { SignInDto } from "@/services/auth/types";
import type { UserDto } from "@/services/user/types";
import type { functionDefaultReturn } from "@/types/functionDefaultReturn";

import { createContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserDto | null;
  signIn: (data: SignInDto) => Promise<functionDefaultReturn>;
  signOut: () => Promise<functionDefaultReturn>;
  refresh: () => Promise<functionDefaultReturn>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
