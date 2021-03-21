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
import * as CryptoES from "crypto-es";

import AuthContext from './components/AuthContext.js';


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
                console.log(data)
                const salt = CryptoES.default.enc.Base64.parse('insightsalt');
                const hashedPasswordWords = CryptoES.default.PBKDF2(data.password, salt, { keySize: 128/32 });
                const hashedPassword = CryptoES.default.enc.Base64.stringify(hashedPasswordWords);

                const formdata = new FormData();
                formdata.append("email", data.emailAddress)
                formdata.append("password", hashedPassword)

                fetch('https://bills-app-305000.ew.r.appspot.com/login', {
                    method: 'POST',
                    body: formdata
                })
                    .then((res) => res.json())
                    .then((result) => {
                        if ("session_token" in result) {
                            console.log(result["session_token"])
                            AsyncStorage.setItem('userAuthenticationToken', result["session_token"])
                            dispatch({type: 'SIGN_IN', token: result["session_token"]});
                        } else {
                            console.log(result["error"])
                            alert(result["error"])
                        }
                    });
            },
            signInWithToken: async data => {
                const formdata = new FormData();
                formdata.append("email", data.emailAddress)
                formdata.append("token", state.userAuthenticationToken)

                fetch('https://bills-app-305000.ew.r.appspot.com/login_with_token', {
                    method: 'POST',
                    body: formdata
                })
                    .then((res) => res.json())
                    .then((result) => {
                        if ("session_token" in result) {
                            console.log(result["session_token"])
                            AsyncStorage.setItem('userAuthenticationToken', result["session_token"])
                            dispatch({type: 'SIGN_IN', token: result["session_token"]});
                        } else {
                            console.log(result["error"])
                            alert(result["error"])
                        }
                    });

            },
            signOut: () => {
                AsyncStorage.setItem('userAuthenticationToken', null)
                dispatch({type: 'SIGN_OUT'})
            },
            signUp: async data => {
                const salt = CryptoES.default.enc.Base64.parse('insightsalt');
                const hashedPasswordWords = CryptoES.default.PBKDF2(data.password, salt, { keySize: 128/32 });
                const hashedPassword = CryptoES.default.enc.Base64.stringify(hashedPasswordWords);

                const formdata = new FormData();
                formdata.append("email", data.emailAddress)
                formdata.append("password", hashedPassword)
                formdata.append("notification_token", "ExponentPushToken[dTC1ViHeJ36_SqB7MPj6B7]")
                formdata.append("postcode", data.postcode)

                fetch('https://bills-app-305000.ew.r.appspot.com/register', {
                    method: 'POST',
                    body: formdata
                })
                    .then((res) => res.json())
                    .then((result) => {
                        if ("session_token" in result) {
                            console.log(result["session_token"])
                            AsyncStorage.setItem('userAuthenticationToken', result["session_token"])
                            dispatch({type: 'SIGN_IN', token: result["session_token"]});
                        } else {
                            console.log(result["error"])
                            alert(result["error"])
                        }
                    });
            },
            userAuthenticationToken: state.userAuthenticationToken,
        }),
        [state.userAuthenticationToken]
    );


    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();

    function BillsStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Bill Feed" component={Bills}/>
                <Stack.Screen name="Bill Details" component={BillDetails}/>
            </Stack.Navigator>
        );
    }

    function MpProfileStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Mp Information" component={MpProfile}/>
            </Stack.Navigator>
        );
    }

    function PreferencesStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Preferences" component={Preferences}/>
            </Stack.Navigator>
        );
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.userAuthenticationToken !== null ? (
                    <SafeAreaView style={paddingStyles.padding}>
                        <Tab.Navigator screenOptions={({route}) => ({
                            tabBarIcon: ({focused, color, size}) => {
                                let icon;

                                if (route.name === 'Bill Feed') {
                                    icon = focused ? 'layers' : 'layers-outline';
                                } else if (route.name === 'Mp Information') {
                                    icon = focused ? 'person' : 'person-outline';
                                } else if (route.name === 'Preferences')
                                    icon = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
                                return <Ionicons name={icon} size={size} color={color}/>;
                            },
                        })}>
                            <Tab.Screen name="Bill Feed" component={BillsStack} options={{title: ''}}/>
                            <Tab.Screen name="Mp Information" component={MpProfileStack} options={{title: ''}}/>
                            <Tab.Screen name="Preferences" component={PreferencesStack} options={{title: ''}}/>
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
