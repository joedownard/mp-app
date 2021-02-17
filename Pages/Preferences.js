import {Text, View, SafeAreaView} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {styles} from './Stylesheets/PreferencesStyles.js';

export default function Preferences() {

    return (
        
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.pageTitleSection}>
                <Text style={styles.pageTitle}>Preferences</Text>
            </View>
            <View style={styles.pageTitleLine}/>
        </SafeAreaView>
    );
}
