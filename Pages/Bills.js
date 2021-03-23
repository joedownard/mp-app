import {Text, View, Image, ScrollView, SafeAreaView, Pressable, TextInput, RefreshControl} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useRef, useState} from "react";
import {styles} from './Stylesheets/BillsStyles.js';

import {BillList} from '../components/BillList.js'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Bills({navigation}) {

    const [billsData, setBillsData] = useState()
    const [searchValue, setSearchValue] = useState("Search for Bill")

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        fetch("https://bills-app-305000.ew.r.appspot.com/bills")
            .then((response) => response.text())
            .then((responseText) => {
                let responseJson = responseText.replaceAll("\'", "\"")
                responseJson = responseJson.replaceAll("None", "\"None\"")
                responseJson = responseJson.substring(1, responseJson.length-2)
                responseJson = JSON.parse(responseJson)
                console.log(responseJson)
                setBillsData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        fetch("https://bills-app-305000.ew.r.appspot.com/bills")
            .then((response) => response.text())
            .then((responseText) => {
                let responseJson = responseText.replaceAll("\'", "\"")
                responseJson = responseJson.replaceAll("None", "\"None\"")
                responseJson = responseJson.substring(1, responseJson.length-2)
                responseJson = JSON.parse(responseJson)
                setBillsData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // if (!billsData) {
    //     console.log(bills)
    //     setBillsData(bills)
    // }

    if (!billsData) {
        return (
        <SafeAreaView style={{flex: 1}}>
            <Text style={styles.loadingDataText}>Loading Data</Text>
        </SafeAreaView>
        )
    } else {
        return (<SafeAreaView style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }>
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

