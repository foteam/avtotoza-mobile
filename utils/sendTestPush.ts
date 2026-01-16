export async function sendTestPush(token: string) {
    console.log(token);
    if (!token) {
        console.log('❌ Нет push token')
        return
    }

    try {
        const res = await fetch(
            'https://exp.host/--/api/v2/push/send',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: token,
                    title: 'Тестовый push 🚀',
                    body: 'Push-уведомления работают!',
                    sound: 'default',
                }),
            }
        )

        const data = await res.json()
        console.log('✅ PUSH RESULT:', data)
    } catch (e) {
        console.log('❌ PUSH ERROR:', e)
    }
}