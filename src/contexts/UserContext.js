import React, { useContext, useState } from "react";

export const UserContext = React.createContext();
export const UserUpdateContext = React.createContext();
export function useUser() {
  return useContext(UserContext);
}
export function useUserUpdate() {
  return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: { firstName: null, lastName: null },
  });

  const updateUser = (user) => setUser(() => user);

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
