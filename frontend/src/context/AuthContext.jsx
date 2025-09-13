import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userToken && !user) {
          const res = await axios.get(`${backendUrl}/api/user/profile`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

          setUser(res.data.others);

        //   console.log(res.data);
        }
      } catch (error) {
        console.error("Session expired or invalid:", error.message);
        setUserToken(null);
        setUser(null);
        localStorage.removeItem("userToken");
      }
    };

    fetchProfile();
  }, [userToken]);

  const value = {
    user,
    setUser,
    backendUrl,
    userToken,
    setUserToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
