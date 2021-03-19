import {Text, View, Image, ScrollView, SafeAreaView, Button, TextInput} from "react-native";
import React, {useState} from "react";
import {styles} from './Stylesheets/MpProfileStyles.js';
import {BillList} from "../components/BillList";

const borisPicture = require('../assets/boris_pic.png');

export default function MpProfile({ navigation }) {

    const mpData = {
        name: 'Boris Johnson',
        constituency: 'Uxbridge and South Ruslip',
        phoneNumber: '020 7219 4682',
        emailAddress: 'boris.johnson.mp@parliament.uk'
    }

    const [searchValue, setSearchValue] = useState("Search for Bill")

    const [billsData, setBillsData] = useState([
        {
            "id": 1,
            "name": "Bill 1 Name",
            "date": "12/02/2019",
            "likes": 102,
            "dislikes": 168,
            "shares": 57,
            "billDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
        },
        {
            "id": 2,
            "name": "Bill 2 Name",
            "date": "06/06/2018",
            "likes": 5,
            "dislikes": 7,
            "shares": 2,
            "billDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
        },
        {
            "id": 3,
            "name": "Bill 3 Name",
            "date": "21/08/2018",
            "likes": 46,
            "dislikes": 22,
            "shares": 19,
            "billDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
        },
        {
            "id": 4,
            "name": "Bill 4 Name",
            "date": "13/11/2018",
            "likes": 55,
            "dislikes": 12,
            "shares": 35,
            "billDescription": "My name jeff"
        }
    ]);

    return (
        <SafeAreaView style={{flex: 1}}>
            {/*<View style={styles.pageTitleSection}>*/}
            {/*    <Text style={styles.pageTitle}>MP Information</Text>*/}
            {/*</View>*/}
            {/*<View style={styles.pageTitleLine}/>*/}

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

                <Button style={styles.messageMpButton}
                        color='#4d4d4d'
                        onPress={() => {
                        }}
                        title="Message"/>
            </View>

            <TextInput style={styles.searchBar} value={searchValue}
                       onChangeText={text => {
                           setSearchValue(text)
                       }}
                       onFocus={_ => {
                           if (searchValue === "Search for Bill") {
                               setSearchValue("")
                           }
                       }
                       }
                       onBlur={_ => {
                           if (searchValue === "") {
                               setSearchValue("Search for Bill")
                           }
                       }
                       }
            />

            <ScrollView style={styles.mpBillsSection}>
                <BillList data={billsData} navigation={navigation} backPage={"MP Profile"} searchTerm={(searchValue === "Search for Bill") ? "" : searchValue}/>
            </ScrollView>
        </SafeAreaView>
    );
}
