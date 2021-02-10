import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {styles} from './Stylesheets/MpProfileStyles.js';

export default function MpProfile() {

    return (
        <View>
            <Text>MP Profile</Text>
            <StatusBar style="auto" />
        </View>
    );
}
