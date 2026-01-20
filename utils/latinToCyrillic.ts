const complexMap: Record<string, string> = {
    // uzbek specific
    "o‘": "ў",
    "o`": "ў",
    "o'": "ў",
    "o’": "ў",
    "g‘": "ғ",
    "g`": "ғ",
    "ng": "нг",

    // common
    "yo": "ё",
    "yu": "ю",
    "ya": "я",
    "ch": "ч",
    "sh": "ш",
    "zh": "ж",
    "ts": "ц",
}

const simpleMap: Record<string, string> = {
    a: "а",
    b: "б",
    d: "д",
    e: "е",
    f: "ф",
    g: "г",
    h: "ҳ",
    i: "и",
    j: "ж",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "п",
    q: "қ",
    r: "р",
    s: "с",
    t: "т",
    u: "у",
    v: "в",
    x: "х",
    y: "й",
    z: "з",
}
function applyCase(source: string, target: string) {
    // ВСЕ БОЛЬШИЕ
    if (source === source.toUpperCase()) {
        return target.toUpperCase()
    }

    // Первая буква большая
    if (
        source[0] === source[0].toUpperCase() &&
        source.slice(1) === source.slice(1).toLowerCase()
    ) {
        return (
            target[0].toUpperCase() +
            target.slice(1).toLowerCase()
        )
    }

    // всё маленькое
    return target.toLowerCase()
}
export function latinToCyrillic(text: string) {
    let result = text

    // 1️⃣ сложные сочетания
    Object.entries(complexMap).forEach(([latin, cyr]) => {
        const regex = new RegExp(latin, "gi")

        result = result.replace(regex, (match) =>
            applyCase(match, cyr)
        )
    })

    // 2️⃣ одиночные буквы
    Object.entries(simpleMap).forEach(([latin, cyr]) => {
        const regex = new RegExp(latin, "gi")

        result = result.replace(regex, (match) =>
            applyCase(match, cyr)
        )
    })

    return result
}