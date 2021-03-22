import {Text, View, Image, ScrollView, SafeAreaView, Pressable, TextInput} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useRef, useState} from "react";
import {styles} from './Stylesheets/BillsStyles.js';

import {bills} from './bill_content.js'

import {BillList} from '../components/BillList.js'

export default function Bills({navigation}) {

    const [billsData, setBillsData] = useState()
    const [searchValue, setSearchValue] = useState("Search for Bill")

    // if (!billsData) {
    //     fetch("https://bills-app-305000.ew.r.appspot.com/bills")
    //         .then((response) => response.text())
    //         .then((responseText) => {
    //             let responseJson = JSON.parse(responseText)
    //             //console.log(responseJson);
    //             //setBillsData(responseJson.result);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

    if (!billsData) {
        console.log(bills)
        setBillsData(bills)
    }

    if (!billsData) {
        return (
        <SafeAreaView style={{flex: 1}}>
            <Text style={styles.loadingDataText}>Loading Data</Text>
        </SafeAreaView>
        )
    } else {
        return (<SafeAreaView style={{flex: 1}}>
            <ScrollView>
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
                <BillList data={billsData} navigation={navigation} backPage={"Bill Feed"}
                          searchTerm={(searchValue === "Search for Bill") ? "" : searchValue}/>
                <StatusBar style="auto"/>
            </ScrollView>
        </SafeAreaView>)
    }
}

