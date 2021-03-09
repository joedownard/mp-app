import {Text, View, Image, ScrollView, SafeAreaView, Pressable} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useRef, useState} from "react";
import {styles} from './Stylesheets/BillsStyles.js';

import {BillList} from '../components/BillList.js'

export default function Bills({navigation}) {

    const [billsData, setBillsData] = useState();
    //     useState([
    //     {
    //         "id": 1,
    //         "title": "Bill 1 Name",
    //         "date_added": "12/02/2019",
    //         "likes": 102,
    //         "dislikes": 168,
    //         "shares": 57,
    //         "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
    //     },
    //     {
    //         "id": 2,
    //         "title": "Bill 2 Name",
    //         "date_added": "06/06/2018",
    //         "likes": 5,
    //         "dislikes": 7,
    //         "shares": 2,
    //         "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
    //     },
    //     {
    //         "id": 3,
    //         "title": "Bill 3 Name",
    //         "date_added": "21/08/2018",
    //         "likes": 46,
    //         "dislikes": 22,
    //         "shares": 19,
    //         "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
    //     },
    //     {
    //         "id": 4,
    //         "title": "Bill 4 Name",
    //         "date_added": "13/11/2018",
    //         "likes": 55,
    //         "dislikes": 12,
    //         "shares": 35,
    //         "desc": "My name jeff"
    //     }
    // ]);

    if (!billsData) {
        fetch("https://bills-app-305000.ew.r.appspot.com/top")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.result);
                setBillsData(responseJson.result);
            })
            .catch((error) => {
                console.error(error);
            });

        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.pageTitleSection}>
                    <View>
                        <Text style={styles.pageTitle}>Bill Feed</Text>
                    </View>
                </View>
                <View style={styles.pageTitleLine}/>
                <Text style={styles.loadingDataText}>Loading Data</Text>
            </SafeAreaView>
        );
    }

    // If the bill data is loaded, then display the list of bills
    if (billsData) {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.pageTitleSection}>
                    <Text style={styles.pageTitle}>Bill Feed</Text>
                </View>
                <View style={styles.pageTitleLine}/>
                <ScrollView>
                    <BillList data={billsData} navigation={navigation} backPage={"Bills"} searchTerm={""}/>
                    <StatusBar style="auto"/>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
