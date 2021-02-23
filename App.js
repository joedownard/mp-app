import React, {useEffect, useState} from 'react';
import Constants from 'expo-constants';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Notifications from 'expo-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Bills from './Pages/Bills.js';
import BillDetails from './Pages/BillDetails.js';
import MpProfile from './Pages/MpProfile.js';
import Preferences from './Pages/Preferences.js';
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
            console.log(token)
        });

    });


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

const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        return (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
};
