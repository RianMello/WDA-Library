import { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../interfaces/ResponseAPI";
import { TableRows } from "../interfaces/toUse";

import api from "../services/api";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextProps {
  load: boolean;
  users: User[];
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export function UserProvider({ children }: UserProviderProps) {
  const [load, setLoad] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api
      .get("/api/usuarios")
      .then((res) => {
        setLoad(false);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserContext.Provider value={{ load, users }}>
      {children}
    </UserContext.Provider>
  );
}
