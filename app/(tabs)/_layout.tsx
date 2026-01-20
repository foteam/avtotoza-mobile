import { Tabs } from 'expo-router'
import { FloatingTabBar } from '../../components/tabbar/FloatingTabBar'

export default function TabsLayout() {
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
