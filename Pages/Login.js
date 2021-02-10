import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {styles} from './Stylesheets/LoginStyles.js';

export default function Login() {

    return (
        <View>
            <Text>Login</Text>
            <StatusBar style="auto" />
        </View>
    );
}
