export function getDistance(
    user: { lat: number; lon: number },
    wash: { lat: number; lon: number }
) {
    const R = 6371
    const dLat = deg2rad(wash.lat - user.lat)
    const dLon = deg2rad(wash.lon - user.lon)

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(deg2rad(user.lat)) *
        Math.cos(deg2rad(wash.lat)) *
        Math.sin(dLon / 2) ** 2

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}
