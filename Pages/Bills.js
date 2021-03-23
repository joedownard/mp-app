import {Text, View, Image, ScrollView, SafeAreaView, Pressable, TextInput, RefreshControl} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useRef, useState} from "react";
import {styles} from './Stylesheets/BillsStyles.js';

import {BillList} from '../components/BillList.js'
import AuthContext from "../components/AuthContext";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Bills({navigation}) {

    const [billsData, setBillsData] = useState()
    const [mpData, setMpData] = useState()
    const [searchValue, setSearchValue] = useState("Search for Bill")
    const {userAuthenticationToken, email} = React.useContext(AuthContext);
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
        const formdata = new FormData();
        formdata.append("email", email)
        formdata.append("session_token", userAuthenticationToken)

        fetch('https://bills-app-305000.ew.r.appspot.com/local_mp', {
            method: 'POST',
            body: formdata
        })
            .then((res) => res.text())
            .then((result) => {
                let responseJson = JSON.parse(result)
                console.log(responseJson)
                setMpData(responseJson)
                updateBillData(responseJson.mp_id)
            }).catch((error) => {
            console.error(error);
        });
    }, []);

    function updateBillData(mp_id) {
        fetch("https://bills-app-305000.ew.r.appspot.com/bills")
            .then((response) => response.text())
            .then((responseText) => {
                let responseJson = responseText.replaceAll("\'", "\"")
                responseJson = responseJson.replaceAll("None", "\"None\"")
                responseJson = responseJson.substring(1, responseJson.length - 2)
                responseJson = JSON.parse(responseJson)
                updateMpVotesData(responseJson, mp_id)
            })
            .catch((error) => {
                console.error(error);
            });
    }


    function updateMpVotesData(data, mp_id) {
        const formdata = new FormData();
        formdata.append("email", email)
        formdata.append("session_token", userAuthenticationToken)
        formdata.append("mp_id", mp_id)

        fetch('https://bills-app-305000.ew.r.appspot.com/mp_bills', {
            method: 'POST',
            body: formdata
        })
            .then((res) => res.text())
            .then((result) => {
                let responseJson = JSON.parse(result)
                responseJson = responseJson["success"]
                responseJson = responseJson.replaceAll("\'", "\"")
                responseJson = responseJson.replaceAll("None", "\"None\"")
                responseJson = JSON.parse(responseJson)

                let newBillsData = []

                data.forEach((bill) => {
                    let newBill = bill
                    responseJson.forEach((voteBill) => {
                        if (voteBill.id === bill.id) {
                            console.log(voteBill.id)
                            if (voteBill["positive"]) {
                                newBill.voted = "voted YES"
                            } else {
                                newBill.voted = "voted NO"
                            }
                        }
                    })
                    if (!newBill.voted) {
                        newBill.voted = "didn't vote"
                    }
                    newBillsData.push(newBill)
                })
                setBillsData(newBillsData);
            }).catch((error) => {
            console.error(error);
        });
    }



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

