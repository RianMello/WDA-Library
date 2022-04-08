import { useContext } from 'react'
import { RentalContext } from '../contexts/RentalsContext'

export function useRental() {
    const context = useContext(RentalContext)
    const { load, rentals } = context
    return { load, rentals }
}