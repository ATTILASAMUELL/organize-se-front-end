import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Login } from "../../pages/login";
import { useNavigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Se o usuário não estiver autenticado, redirecione para a página de login
    if (!auth.user) {
      navigate("/login");
    }
  }, [auth.user, navigate]);

  // Se o usuário não estiver autenticado, retorne a página de login
  if (!auth.user) {
    return <Login />;
  }

  // Se o usuário estiver autenticado, renderize os filhos
  return children;
};
