import {Text, View, Image, ScrollView, SafeAreaView, Button} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {styles} from './Stylesheets/MpProfileStyles.js';

export default function MpProfile() {

    const mpData = {name: 'Boris Johnson', constituency:'Uxbridge and South Ruslip', phoneNumber:'020 7219 4682', emailAddress: 'boris.johnson.mp@parliament.uk'}

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.pageTitleSection}>
                <Text style={styles.pageTitle}>MP Information</Text>
            </View>
            <View style={styles.pageTitleLine}/>

            <View style={styles.mpInfoSection}>

                <Text style={styles.mpName}>{mpData.name}</Text>
                <Text style={styles.mpConstituency}>{mpData.constituency}</Text>

                <Text style={styles.contactDetailsTitle}>Contact Details</Text>
                <Text style={styles.mpPhoneNumber}>Phone: {mpData.phoneNumber}</Text>
                <Text style={styles.mpEmailAddress}>Email: {mpData.emailAddress}</Text>

                <Button style={styles.messageMpButton}
                        color='#4d4d4d'
                        onPress={() => {}}
                        title="Message"/>
            </View>


            <View style={styles.mpBillsSection}>

            </View>
        </SafeAreaView>
    );
}
