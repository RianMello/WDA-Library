import { AxiosRequestConfig } from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import { Publisher } from "../interfaces/ResponseAPI";

import api from "../services/api";

interface PublisherProviderProps {
  children: ReactNode;
}
interface PublisherContextProps {
  load: boolean;
  publishers: Publisher[];
  getPublishers: () => void;
  addPublisher: (
    publisher: Publisher,
    onFinish: (success: boolean) => void
  ) => void;
  editPublisher: (
    publisher: Publisher,
    onFinish: (success: boolean) => void
  ) => void;
  deletePublisher: (
    publisher: Publisher,
    onFinish: (success: boolean) => void
  ) => void;
}

export const PublishersContext = createContext<PublisherContextProps>(
  {} as PublisherContextProps
);

export function PublisherProvider({ children }: PublisherProviderProps) {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getPublishers();
  }, []);

  function getPublishers() {
    api
      .get("/api/editoras")
      .then((res) => {
        setLoad(false);
        setPublishers(res.data);
      })
      .catch((err) => console.log(err));
  }

  function addPublisher(
    publisher: Publisher,
    onFinish: (success: boolean) => void
  ) {
    api
      .post("/api/editora", publisher)
      .then(() => {
        onFinish(true);
      })
      .catch((err) => {
        alert(err);
        onFinish(false);
      });
  }
  function editPublisher(
    publisher: Publisher,
    onFinish: (success: boolean) => void
  ) {
    api
      .put("/api/editora", publisher)
      .then(() => {
        onFinish(true);
      })
      .catch((err) => {
        alert(err);
        onFinish(false);
      });
  }
  function deletePublisher(
    publisher: Publisher,
    onFinish: (success: boolean) => void
  ) {
    api
      .delete("/api/editora", { data: publisher } as AxiosRequestConfig)
      .then(() => {
        onFinish(true);
      })
      .catch((err) => {
        alert(err);
        onFinish(false);
      });
  }

  return (
    <PublishersContext.Provider
      value={{
        load,
        publishers,
        getPublishers,
        addPublisher,
        editPublisher,
        deletePublisher,
      }}
    >
      {children}
    </PublishersContext.Provider>
  );
}
