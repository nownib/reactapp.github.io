import React, { useState, useEffect } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
  const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  });

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
    console.log(userData)
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  const fetchUser = async () => {
    let response = await getUserAccount();

    if (response && response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;

      let data = {
        isAuthenticated: true,
        token,
        account: { groupWithRoles, email, username },
        isLoading: false,
      };
      // setTimeout(() => {
        setUser(data);
      // }, 0.3 * 1000);
    } else {
      setUser({ ...userDefault, isLoading: false });
    }
  };
  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
