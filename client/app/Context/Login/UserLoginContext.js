import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

export default function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const { push } = useRouter();
  const [isLogin, setisLogin] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    const resetPasswordURLRegex = /^\/reset-password\/[^/]+\/[^/]+$/;

    if (authToken) {
      const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000;
      if (Date.now() < expirationTime) {
        setisLogin(true);
      } else {
        Cookies.remove("authToken");
        push("/sign-in");
      }
    } else {
      setisLogin(false);
      // push("/sign-in");
      const path = window.location.pathname;
      // console.log(resetPasswordURLRegex.test(path));
      if (resetPasswordURLRegex.test(path)) {
        push(path);
      } else {
        // setisLogin(false);
        push("/sign-in");
      }
    }
  }, [push]);

  const value = {
    isLogin,
    setisLogin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
