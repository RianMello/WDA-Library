import { createContext, useState, ReactNode, useEffect } from "react";
import { Publisher } from "../interfaces/ResponseAPI";

import api from "../services/api";

interface PublisherProviderProps {
  children: ReactNode;
}
interface PublisherContextProps {
  load: boolean;
  publishers: Publisher[];
}

export const PublishersContext = createContext<PublisherContextProps>(
  {} as PublisherContextProps
);

export function PublisherProvider({ children }: PublisherProviderProps) {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    api
      .get("/api/editoras")
      .then((res) => {
        setLoad(false);
        setPublishers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <PublishersContext.Provider value={{ load, publishers }}>
      {children}
    </PublishersContext.Provider>
  );
}
