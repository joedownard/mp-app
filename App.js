import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Bills from './Pages/Bills.js';
import MpProfile from './Pages/MpProfile.js';
import Preferences from './Pages/Preferences.js';

export default function App() {

    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Bills" component={Bills}/>
                <Tab.Screen name="MP Profile" component={MpProfile}/>
                <Tab.Screen name="Preferences" component={Preferences}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
