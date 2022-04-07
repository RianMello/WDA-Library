import { useContext } from 'react';
import { UserContext } from '../contexts/UsersContext';

export function useUser() {
    const context = useContext(UserContext)
    const { load, users } = context;
    return { load, users }
}