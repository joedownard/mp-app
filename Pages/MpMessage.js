import React from "react";
import {Text, View, Image, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import {styles} from './Stylesheets/MpMessageStyles.js';

const borisPicture = require('../assets/boris_pic.png'); //this is just a placeholder


export default function MpMessage({ navigation }) {

    const mpData = {
        name: 'Boris Johnson',
        constituency: 'Uxbridge and South Ruslip',
        phoneNumber: '020 7219 4682',
        emailAddress: 'boris.johnson.mp@parliament.uk'
    } //and this

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.mpInfoSection}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.textSection}>

                        <Text style={styles.mpName}>{mpData.name}</Text>
                        <Text style={styles.mpConstituency}>{mpData.constituency}</Text>

                        <Text style={styles.contactDetailsTitle}>Contact Details</Text>
                        <Text style={styles.mpPhoneNumber}>Phone: {mpData.phoneNumber}</Text>
                        <Text style={styles.mpEmailAddress}>Email: {mpData.emailAddress}</Text>
                    </View>
                    <View>
                        <Image style={styles.mpPicture} source={borisPicture}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}