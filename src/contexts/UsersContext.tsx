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
  getUsers: () => void;
  addUser: (user: User, onFinish: (success: boolean) => void) => void;
  editUser: (user: User, onFinish: (success: boolean) => void) => void;
  deleteUser: (user: User, onFinish: (success: boolean) => void) => void;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export function UserProvider({ children }: UserProviderProps) {
  const [load, setLoad] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    api
      .get("/api/usuarios")
      .then((res) => {
        setLoad(false);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }

  function addUser(user: User, onFinish: (success: boolean) => void) {
    api
      .post("/api/usuario", { data: user } as AxiosRequestConfig)
      .then(() => {
        onFinish(true);
        console.log("Deleted User Record");
      })
      .catch((err) => {
        onFinish(false);
        console.log(err);
      });
  }

  function editUser(user: User, onFinish: (success: boolean) => void) {
    api
      .put("/api/usuario", { data: user } as AxiosRequestConfig)
      .then(() => {
        onFinish(true);
        console.log("Updated User Record");
      })
      .catch((err) => {
        onFinish(false);
        console.log(err);
      });
  }

  function deleteUser(user: User, onFinish: (success: boolean) => void) {
    api
      .delete("/api/usuario", { data: user } as AxiosRequestConfig)
      .then(() => {
        onFinish(true);
        console.log("Deleted User Record");
      })
      .catch((err) => {
        onFinish(false);
        console.log(err);
      });
  }

  return (
    <UserContext.Provider
      value={{ load, users, deleteUser, addUser, editUser, getUsers }}
    >
      {children}
    </UserContext.Provider>
  );
}
