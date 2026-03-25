import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "@/context/AuthContext";
import { api } from "@/config/api";
import { Inteceptors } from "@/services/auth/auth.interceptors";
import { authService } from "@/services/auth/auth.service";
import type { UserDto } from "@/services/user/types";
import type { SignInDto } from "@/services/auth/types";
import { Container, Typography } from "@mui/material";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserDto | null>(null);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      signIn: async (data: SignInDto) => {
        const result = await authService.signIn(data);
        if (result.success) {
          setIsAuthenticated(true);
          setUser(result.data.user);
        }
        return result;
      },
      signOut: async () => {
        const result = await authService.signOut();
        if (result.success) {
          setIsAuthenticated(false);
          setUser(null);
        }
        return result;
      },
      refresh: async () => {
        const result = await authService.refresh();
        if (result.success) {
          setIsAuthenticated(true);
          setUser(result.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
        return result;
      },
    }),
    [isAuthenticated, user],
  );

  async function restoreSession() {
    try {
      return await value.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Inteceptors.accesTokenInteceptor(api);
    Inteceptors.refreshTokenInteceptor(api);
    Inteceptors.netWorkErrorInteceptor(api);
  }, []);

  useEffect(() => {
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography variant="body1" sx={{ marginTop: 45, opacity: 1 }}>
          Carregando aplicação...
        </Typography>
      </Container>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
