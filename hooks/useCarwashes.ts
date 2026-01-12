import { useQuery } from '@tanstack/react-query'
import { fetchCarwashes, fetchCarwashById } from '../api/carwash'
import { Carwash } from '../types/carwash'

export function useCarwashes() {
    return useQuery<Carwash[]>({
        queryKey: ['carwashes'],
        queryFn: fetchCarwashes,
    })
}

export function useCarwash(id?: string) {
    return useQuery({
        queryKey: ['carwash', id],
        queryFn: () => fetchCarwashById(id!),
        enabled: !!id,
    })
}