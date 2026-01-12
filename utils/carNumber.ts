export const uzFormat1 = /^\d{2}\s[A-Z]\s\d{3}\s[A-Z]{2}$/ // 00 A 000 AA
export const uzFormat2 = /^\d{2}\s\d{3}\s[A-Z]{3}$/        // 00 000 AAA

export function formatCarNumber(value: string) {
    let v = value.toUpperCase().replace(/[^A-Z0-9]/g, '')

    if (v.length <= 2) return v

    const isFormat1 = /^[0-9]{2}[A-Z]/.test(v)

    if (isFormat1) {
        if (v.length <= 3) return `${v.slice(0,2)} ${v.slice(2)}`
        if (v.length <= 6) return `${v.slice(0,2)} ${v.slice(2,3)} ${v.slice(3)}`
        return `${v.slice(0,2)} ${v.slice(2,3)} ${v.slice(3,6)} ${v.slice(6,8)}`
    }

    if (v.length <= 5) return `${v.slice(0,2)} ${v.slice(2)}`
    return `${v.slice(0,2)} ${v.slice(2,5)} ${v.slice(5,8)}`
}
