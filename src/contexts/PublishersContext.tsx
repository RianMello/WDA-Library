import { createContext, useState, ReactNode, useEffect } from "react";
import { Publisher } from "../interfaces/ResponseAPI";

import api from "../services/api";

interface PublisherProvider {
  children: ReactNode;
}

interface PublisherContextProps {
  load: boolean;
  publisher: Publisher[];
}

export const PublisherContext = createContext<PublisherContextProps>(
  {} as PublisherContextProps
);

export function PublisherProvider({ children }: PublisherProvider) {
  const [load, setLoad] = useState(true);
  const [publisher, setPublisher] = useState<Publisher[]>([]);

  useEffect(() => {
    api
      .get("/api/editoras")
      .then((res) => {
        setLoad(false);
        setPublisher(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <PublisherContext.Provider value={{ load, publisher }}>
      {children}
    </PublisherContext.Provider>
  );
}
