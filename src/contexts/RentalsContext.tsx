import { createContext, useState, ReactNode, useEffect } from "react";
import { Rental } from "../interfaces/ResponseAPI";
import api from "../services/api";

interface RentalProviderProps {
  children: ReactNode;
}

interface RentalContextProps {
  load: boolean;
  rentals: Rental[];
}

export const RentalContext = createContext({} as RentalContextProps);

export function RentalProvider({ children }: RentalProviderProps) {
  const [load, setLoad] = useState(true);
  const [rentals, setRental] = useState<Rental[]>([]);

  useEffect(() => {
    api
      .get("/api/alugueis")
      .then((res) => {
        setLoad(false);
        setRental(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <RentalContext.Provider value={{ load, rentals }}>
      {children}
    </RentalContext.Provider>
  );
}
