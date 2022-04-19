import { AxiosRequestConfig } from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import { Rental } from "../interfaces/ResponseAPI";
import api from "../services/api";

interface RentalProviderProps {
  children: ReactNode;
}

interface RentalContextProps {
  load: boolean;
  rentals: Rental[];
  getRentals: () => void;
  addRental: (rental: Rental, onFinish: (success: boolean) => void) => void;
  editRental: (rental: Rental, onFinish: (success: boolean) => void) => void;
  deleteRental: (rental: Rental, onFinish: (success: boolean) => void) => void;
}

export const RentalContext = createContext({} as RentalContextProps);

export function RentalProvider({ children }: RentalProviderProps) {
  const [load, setLoad] = useState(true);
  const [rentals, setRental] = useState<Rental[]>([]);

  useEffect(() => {
    getRentals();
  }, []);

  function getRentals() {
    api
      .get("/api/alugueis")
      .then((res) => {
        setLoad(false);
        setRental(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function addRental(rental: Rental, onFinish: (success: boolean) => void) {
    api
      .post("/api/aluguel", rental)
      .then(() => {
        onFinish(true);
      })
      .catch((err) => {
        onFinish(false);
        alert(err);
      });
  }

  function editRental(rental: Rental, onFinish: (success: boolean) => void) {
    api
      .put("/api/aluguel", rental)
      .then(() => {
        onFinish(true);
      })
      .catch((err) => {
        onFinish(false);
        alert(err);
      });
  }

  function deleteRental(rental: Rental, onFinish: (success: boolean) => void) {
    api
      .delete("/api/aluguel", { data: rental } as AxiosRequestConfig)
      .then(() => {
        onFinish(true);
      })
      .catch((err) => {
        onFinish(false);
        alert(err);
      });
  }

  return (
    <RentalContext.Provider
      value={{ load, rentals, getRentals, addRental, editRental, deleteRental }}
    >
      {children}
    </RentalContext.Provider>
  );
}
