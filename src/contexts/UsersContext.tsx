import { AxiosRequestConfig } from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../interfaces/ResponseAPI";

import api from "../services/api";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextProps {
  load: boolean;
  users: User[];
  addUser: (user: User, onFinish: () => void) => void;
  editUser: (user: User, onFinish: () => void) => void;
  deleteUser: (user: User, onFinish: () => void) => void;
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

  function addUser(user: User, onFinish: () => void) {
    api
      .post("/api/usuario", { data: user } as AxiosRequestConfig)
      .then(() => console.log("Deleted User Record"))
      .catch((err) => console.log(err));
  }

  function editUser(user: User, onFinish: () => void) {
    api
      .put("/api/usuario", { data: user } as AxiosRequestConfig)
      .then(() => console.log("Deleted User Record"))
      .catch((err) => console.log(err));
  }

  function deleteUser(user: User, onFinish: () => void) {
    api
      .delete("/api/usuario", { data: user } as AxiosRequestConfig)
      .then(() => console.log("Deleted User Record"))
      .catch((err) => console.log(err));
  }

  return (
    <UserContext.Provider
      value={{ load, users, deleteUser, addUser, editUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
