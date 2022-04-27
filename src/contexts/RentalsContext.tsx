import { AxiosRequestConfig } from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import { Rental } from "../interfaces/ResponseAPI";
import api from "../services/api";
import dayjs from "dayjs";
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
  lastRentals: () => Rental[];
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

  function lastRentals() {
    let last = rentals
      .sort((a, b) => {
        let dateA = new Date(Date.parse(a.data_aluguel));
        let dateB = new Date(Date.parse(b.data_aluguel));
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        }
        return 0;
      })
      .slice(0, 5);

    return last;
  }
  return (
    <RentalContext.Provider
      value={{
        load,
        rentals,
        getRentals,
        addRental,
        editRental,
        deleteRental,
        lastRentals,
      }}
    >
      {children}
    </RentalContext.Provider>
  );
}
