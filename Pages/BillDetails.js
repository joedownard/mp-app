import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {styles} from './Stylesheets/BillDetailsStyles.js';

export default function BillDetails() {

    return (
        <View>
            <Text>Bill Details</Text>
            <StatusBar style="auto" />
        </View>
    );
}
