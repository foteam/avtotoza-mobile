export type Carwash = {
    _id: string
    carwash_id: string
    name: string
    address: string
    banner: string | null
    rating: number
    distance: string | "0"
    isPremium: boolean
    priceFrom?: number | null
    location?: [number, number] | null
}
