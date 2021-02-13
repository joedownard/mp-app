import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Bills from './Pages/Bills.js';
import MpProfile from './Pages/MpProfile.js';
import Preferences from './Pages/Preferences.js';

export default function App() {

    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let icon;

                    if (route.name === 'Bills') {
                        icon = focused ? 'layers' : 'layers-outline';
                    } else if (route.name === 'MP Profile') {
                        icon = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Preferences')
                        icon = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
                    return <Ionicons name={icon} size={size} color={color} />;
                },
            })}>
                <Tab.Screen name="Bills" component={Bills} options={{ title: '' }} />
                <Tab.Screen name="MP Profile" component={MpProfile} options={{ title: '' }}/>
                <Tab.Screen name="Preferences" component={Preferences} options={{ title: '' }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
