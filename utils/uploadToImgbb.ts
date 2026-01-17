export async function uploadToImgbb(uri: string): Promise<string> {
    const formData = new FormData()

    formData.append('image', {
        uri,
        name: 'car.jpg',
        type: 'image/jpeg',
    } as any)

    formData.append('key', '01074699432b7e4645f98fe66efebec3')

    const res = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
    })

    const json = await res.json()

    if (!json?.data?.url) {
        throw new Error('Image upload failed')
    }

    return json.data.url
}
