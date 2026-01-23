import * as Analytics from 'expo-firebase-analytics';

export const logEvent = async (
    name: string,
    params?: Record<string, any>
) => {
    try {
        await Analytics.logEvent(name, params);
    } catch (e) {
        console.log('Analytics error:', e);
    }
};

export const logScreen = async (screenName: string) => {
    try {
        await Analytics.logEvent('screen_view', {
            screen_name: screenName,
            screen_class: screenName,
        });
    } catch (e) {
        console.log('Screen analytics error:', e);
    }
};
