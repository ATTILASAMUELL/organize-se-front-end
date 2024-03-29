import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";
import { ClipLoader } from 'react-spinners';
import logoWithName from '../../images/logoWithName.png';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();
  const [loading, setLoading] = useState<boolean>(true);
  const auth = useContext(AuthContext);

  const updateContextUser = (newUser: User | null) => {
    if (auth && auth.setUser) {
      auth.setUser(newUser);
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validateToken(storageData);
        if(data !== undefined) {
          if (data.data.user) {
            setUser(data.data.user);
            setTokenStorage(data.data.authorization.token);
            updateContextUser(data.data.user); // Atualiza o contexto após setUser
          } else {
            setUser(null);
            setTokenStorage("");
            updateContextUser(null); // Atualiza o contexto para null
          }

        } else {
          setUser(null);
          setTokenStorage("");
          updateContextUser(null); // Atualiza o contexto para null
        }
        
      }
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
     
    };
    validateToken();
  }, [auth]);

  

  const signin = async (email: string, password: string) => {
    try {
      let data = await api.signin(email, password);
      
      if (data.data !== undefined) {
        if(data.data.user !== undefined) {
          setUser(data.data.user);
          setTokenStorage(data.data.authorization.token);
        }
       
      }
      return data;
    } catch (error) {
      return error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await api.register(name, email, password);
    setUser(null);
    setTokenStorage("");
    return data;
  };

  const signout = async () => {
    const storageData = localStorage.getItem("authToken");
    await api.signout(storageData);
    setUser(null);
    setTokenStorage("");
  };

  const setTokenStorage = async (token: string) => {
    localStorage.setItem("authToken", token);
  };

  if (loading) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop:"10px" }}>
    <div style={{ marginRight: "10px" }}>
      <ClipLoader loading={true} size={35} aria-label="Loading Spinner" color='#8cc84b' data-testid="loader" />
    </div>
    <img src={logoWithName} alt="logo"  width={270} height={70} />
  </div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, signin, signout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
