import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {styles} from './Stylesheets/PreferencesStyles.js';

export default function Preferences() {

    return (
        <View>
            <Text>Preferences</Text>
            <StatusBar style="auto" />
        </View>
    );
}
