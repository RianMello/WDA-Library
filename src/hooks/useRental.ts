import { useContext } from 'react'
import { RentalContext } from '../contexts/RentalsContext'

export function useRental() {
    const context = useContext(RentalContext)
    const { load, rentals, getRentals, addRental, editRental, deleteRental, lastRentals } = context
    return {
        load, rentals, getRentals, addRental, editRental, deleteRental, lastRentals
    }
}