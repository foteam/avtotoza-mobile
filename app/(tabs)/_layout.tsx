import { Tabs } from 'expo-router'
import { FloatingTabBar } from '../../components/tabbar/FloatingTabBar'
import { useAutoRefreshUser } from '@/hooks/useAutoRefreshUser'

export default function TabsLayout() {
    useAutoRefreshUser()
    return (
        <Tabs
            screenOptions={{
                headerShown: false,

            }}
            tabBar={(props) => <FloatingTabBar {...props} />}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="garage" />
            <Tabs.Screen name="profile" />
        </Tabs>
    )
}
