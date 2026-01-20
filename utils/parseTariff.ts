export type ParsedTariff = {
    base: 'basic' | 'standart' | 'premium'
    plus: boolean
    category?: 'sedan' | 'crossover'
}

export function parseTariff(raw: string): ParsedTariff {
    const lower = raw.toLowerCase()

    const base =
        lower.includes('premium')
            ? 'premium'
            : lower.includes('standart')
                ? 'standart'
                : 'basic'

    const plus = lower.includes('+')

    let category: ParsedTariff['category']

    if (lower.includes('sedan')) category = 'sedan'
    if (lower.includes('krassover')) category = 'crossover'
    if (lower.includes('krossover')) category = 'crossover'
    if (lower.includes('crossover')) category = 'crossover'

    return { base, plus, category }
}
