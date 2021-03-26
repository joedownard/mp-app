import {Text, ScrollView, SafeAreaView, TextInput, RefreshControl} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {styles} from './Stylesheets/BillsStyles.js';

import {BillList} from '../components/BillList.js'
import AuthContext from "../components/AuthContext";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Bills({navigation}) {

    const [billsData, setBillsData] = useState()
    const [searchValue, setSearchValue] = useState("Search for Bill")
    const {userAuthenticationToken, email, postcodeUpdated} = React.useContext(AuthContext);
    const [refreshing, setRefreshing] = React.useState(false);
    const isUnMounted = React.useRef(false);

    const onRefresh = React.useCallback(() => {
        // Refresh bills on drag down
        getLocalMp()
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        // Get local MP from the server and then get bills
        getLocalMp()

        // This runs when the component is unmounted, don't do any state updates after this
        return () => {
            isUnMounted.current = true;
        };
    }, [postcodeUpdated]);

    function getLocalMp() {
        const formdata = new FormData();
        formdata.append("email", email)
        formdata.append("session_token", userAuthenticationToken)

        // Get the local mp from the server
        fetch('https://bills-app-305000.ew.r.appspot.com/local_mp', {
            method: 'POST',
            body: formdata
        })
            .then((res) => res.json())
            .then((responseJson) => {
                if (responseJson["error"]) {
                    if (responseJson["error"] === "invalid_credentials") signOut()
                }
                updateBillData(responseJson.mp_id)
            }).catch((error) => {
            console.error(error);
        });
    }

    function updateBillData(mp_id) {
        const formdata = new FormData();
        formdata.append("email", email)
        formdata.append("session_token", userAuthenticationToken)

        // Get the list of bills from the server
        fetch('https://bills-app-305000.ew.r.appspot.com/get_bills', {
            method: 'POST',
            body: formdata
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson["error"]) {
                    if (responseJson["error"] === "invalid_credentials") signOut()
                }
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

        // Get a dictionary of how the local mp voted from the server
        fetch('https://bills-app-305000.ew.r.appspot.com/get_mp_votes', {
            method: 'POST',
            body: formdata
        })
            .then((res) => res.json())
            .then((responseJson) => {
                if (responseJson["error"]) {
                    if (responseJson["error"] === "invalid_credentials") signOut()
                }

                let newBillsData = []

                // Mark which bills the MP voted on and which way they voted
                data.forEach((bill) => {
                    let newBill = bill
                    if (bill.id in responseJson) {
                        if (responseJson[bill.id]) {
                            newBill.voted = "voted YES"
                        } else {
                            newBill.voted = "voted NO"
                        }
                    }
                    if (!newBill.voted) {
                        newBill.voted = "didn't vote"
                    }
                    newBillsData.push(newBill)
                })

                // Ensure that the component hasn't been unmounted
                if (!isUnMounted.current) {
                    setBillsData(newBillsData);
                }
            }).catch((error) => {
            console.error(error);
        });
    }

    if (!billsData) {
        return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />}>
            <Text style={styles.loadingDataText}>Loading Data</Text>
                            </ScrollView>
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

