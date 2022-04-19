import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Rent, User } from "../../../../../interfaces/ResponseAPI";
import { SelectContainer } from "./style";

interface SelectProps {
  rent?: Rent;
  users: User[];
  userChange: (user: User) => void;
}

export function SelectUser({ rent, users, userChange }: SelectProps) {
  const [user, setUser] = useState(users[0]);
  const { t } = useTranslation();

  return (
    <SelectContainer>
      <label htmlFor="user_id">{t("rental.responsible")}e:</label>
      <Field
        as="select"
        id="user_id"
        name={user.id}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          users.map((user) => {
            if (user.id === Number(e.target.value)) {
              userChange(user);
              setUser(user);
            }
          });
        }}
      >
        <option></option>
        {users.map((user) => {
          if (rent?.id && rent?.usuario_id.id === user.id) {
            return (
              <option selected key={user.id} value={user.id}>
                {user.nome}
              </option>
            );
          }
          return (
            <option key={user.id} value={user.id}>
              {user.nome}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name="usuario_id" />
    </SelectContainer>
  );
}
