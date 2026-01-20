export const uzFormat1 = /^\d{2}\s[A-Z]\s\d{3}\s[A-Z]{2}$/ // 00 A 000 AA
export const uzFormat2 = /^\d{2}\s\d{3}\s[A-Z]{3}$/        // 00 000 AAA

export function formatCarNumber(value: string) {
    // 🔴 если RN передал что-то странное
    if (!value) return ''

    // очищаем
    let v = value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')

    // 🔴 КЛЮЧЕВО: если реально пусто
    if (v.length === 0) return ''

    // первые 2 символа
    if (v.length <= 2) return v

    const isFormat1 = /^[0-9]{2}[A-Z]/.test(v)

    let result = ''

    if (isFormat1) {
        if (v.length <= 3) {
            result = `${v.slice(0, 2)} ${v.slice(2)}`
        } else if (v.length <= 6) {
            result = `${v.slice(0, 2)} ${v.slice(2, 3)} ${v.slice(3)}`
        } else {
            result = `${v.slice(0, 2)} ${v.slice(2, 3)} ${v.slice(3, 6)} ${v.slice(6, 8)}`
        }
    } else {
        if (v.length <= 5) {
            result = `${v.slice(0, 2)} ${v.slice(2)}`
        } else {
            result = `${v.slice(0, 2)} ${v.slice(2, 5)} ${v.slice(5, 8)}`
        }
    }

    // 🔴 КЛЮЧ: убираем хвостовые пробелы
    return result.trim()
}
