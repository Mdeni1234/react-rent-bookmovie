import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [configJWT, setConfigJWT] = useState(null);
  useEffect(() => {
    if (user) {
      setConfigJWT(
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    }
  }, [user])
  return (
    <UserContext.Provider value={[user, setUser, configJWT]}>
      {props.children}
    </UserContext.Provider>
  );
};
