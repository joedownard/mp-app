import React, {useEffect, useState, useReducer} from 'react';
import Constants from 'expo-constants';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Notifications from 'expo-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from "react-native";
import {Platform, StatusBar, StyleSheet} from 'react-native';

import AuthContext from './components/AuthContext.js';
import * as CryptoES from "crypto-es";


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

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userAuthenticationToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userAuthenticationToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userAuthenticationToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userAuthenticationToken: null,
        },
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userAuthenticationToken');
            } catch (e) {
                console.log("Failed to restore user authentication token")
            }
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {

                // communicate with server here to get token

                const salt = CryptoES.default.lib.WordArray.random(128/8);
                const hashedPassword = CryptoES.default.PBKDF2(data.password, salt, { keySize: 128/32 });


                let responseToken = 'dummy-auth-token'
                AsyncStorage.setItem('userAuthenticationToken', responseToken)
                dispatch({type: 'SIGN_IN', token: responseToken});
            },
            signOut: () => {
                AsyncStorage.setItem('userAuthenticationToken', null)
                dispatch({type: 'SIGN_OUT'})
            },
            signUp: async data => {
                // communicate with server here to get token
                console.log(data)

                const salt = CryptoES.default.lib.WordArray.random(128/8);
                const hashedPassword = CryptoES.default.PBKDF2(data.password, salt, { keySize: 128/32 });

                let responseToken = 'dummy-auth-token'
                AsyncStorage.setItem('userAuthenticationToken', responseToken)

                dispatch({type: 'SIGN_IN', token: responseToken});
            },
            userAuthenticationToken: state.userAuthenticationToken,
        }),
        [state.userAuthenticationToken]
    );


    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();

    function BillsStack() {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Bills" component={Bills}/>
                <Stack.Screen name="Bill Details" component={BillDetails}/>
            </Stack.Navigator>
        );
    }

    return (
            <AuthContext.Provider value={authContext}>
                <NavigationContainer>
                    {state.userAuthenticationToken === "dummy-auth-token" ?  (
                        <SafeAreaView style={paddingStyles.padding}>
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
                                <Tab.Screen name="Bills" component={BillsStack} options={{title: ''}}/>
                                <Tab.Screen name="MP Profile" component={MpProfile} options={{title: ''}}/>
                                <Tab.Screen name="Preferences" component={Preferences} options={{title: ''}}/>
                            </Tab.Navigator>
                        </SafeAreaView>
                        ) : (
                        <SafeAreaView style={paddingStyles.noPadding}>
                            <Stack.Navigator>
                                <Stack.Screen name={"Login"} component={Login}/>
                                <Stack.Screen name={"Signup"} component={Signup}/>
                            </Stack.Navigator>
                        </SafeAreaView>
                    )}
                </NavigationContainer>
            </AuthContext.Provider>
    );
}

const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            //alert('Failed to get push token for push notification!');
            return;
        }
        return (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        //alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
};

const paddingStyles = StyleSheet.create({
    padding: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },

    noPadding: {
        flex: 1,
        paddingTop: 0
    },
});
