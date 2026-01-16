export function getRatingFromReviews(
    reviews: { rating: number }[]
) {
    if (!reviews.length) {
        return {
            rating: 0,
            count: 0,
        }
    }

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
    const avg = sum / reviews.length

    return {
        rating: Number(avg.toFixed(1)),
        count: reviews.length,
    }
}