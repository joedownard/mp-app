import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Bills from './Pages/Bills.js';
import BillDetails from './Pages/BillDetails.js';
import MpProfile from './Pages/MpProfile.js';
import Preferences from './Pages/Preferences.js';
import {View} from "react-native-web";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

export default function App() {

    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();

    function BillsStack() {
        return (
            <Stack.Navigator  screenOptions={{headerShown: false}}>
                <Stack.Screen name="Bills" component={Bills}/>
                <Stack.Screen name="Bill Details" component={BillDetails}/>
            </Stack.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let icon;

                    if (route.name === 'Bills') {
                        icon = focused ? 'layers' : 'layers-outline';
                    } else if (route.name === 'MP Profile') {
                        icon = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Preferences')
                        icon = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
                    return <Ionicons name={icon} size={size} color={color}/>;
                },
            })}>
                <Tab.Screen name="Login" component={Login}/>
                <Tab.Screen name="Signup" component={Signup}/>
                <Tab.Screen name="Bills" component={BillsStack} options={{title: ''}}/>
                <Tab.Screen name="MP Profile" component={MpProfile} options={{title: ''}}/>
                <Tab.Screen name="Preferences" component={Preferences} options={{title: ''}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
