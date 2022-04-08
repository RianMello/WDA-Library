import { useContext } from "react";
import { PublishersContext } from '../contexts/PublishersContext'

export function usePublisher() {
    const context = useContext(PublishersContext)
    const { load, publishers } = context
    return { load, publishers }
}