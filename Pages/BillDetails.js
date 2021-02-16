import {Image, Pressable, SafeAreaView, Text, View, ScrollView} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {styles} from './Stylesheets/BillDetailsStyles.js';

/*
const thumbsUp = require('../assets/large_thumbs_up.png');
const thumbsUpFilled = require('../assets/large_thumbs_up_filled.png');
const thumbsDown = require('../assets/large_thumbs_down.png');
const thumbsDownFilled = require('../assets/large_thumbs_down_filled.png');
const favourite = require('../assets/favourite_icon.png');
const favouriteFilled = require('../assets/favourite_icon_filled.png');
*/
const share = require('../assets/share_icon.png')
const back = require('../assets/back_button_icon.png')

export default function BillDetails({route, navigation}) {

    const params = route.params;

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.pageTitleSection}>
                <Pressable onPress={() => {
                    navigation.goBack()
                }}>
                    <Image style={styles.backButton} source={back}/>
                </Pressable>
                <Text style={styles.pageTitle}>Bill Details</Text>
                <Image style={styles.shareButton} source={share}/>
            </View>
            <View style={styles.mainContent}>
                <View style={styles.pageTitleLine}/>

                <View style={styles.billDescriptionSection}>
                    <Text>Bill with id: {params.id}</Text>
                </View>

                <View style={styles.billStatusSection}>

                </View>

                <View style={styles.billReactionSection}>

                </View>
            </View>
        </SafeAreaView>
    );
}
