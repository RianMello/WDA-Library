import { useContext } from 'react';
import { UserContext } from '../contexts/UsersContext';

export function useUser() {
    const context = useContext(UserContext)
    const { load, users, deleteUser, addUser, editUser, getUsers } = context;
    return { load, users, deleteUser, addUser, editUser, getUsers }
}