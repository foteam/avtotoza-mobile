export function isLatin(text: string) {
    return /^[a-z0-9\s()+-]+$/i.test(text)
}
