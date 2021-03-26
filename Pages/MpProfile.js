import {Text, View, Image, ScrollView, SafeAreaView, Button, TextInput, RefreshControl} from "react-native";
import React, {useEffect, useState} from "react";
import {styles} from './Stylesheets/MpProfileStyles.js';
import {BillList} from "../components/BillList";
import AuthContext from "../components/AuthContext.js";

const no_photo = require('../assets/no_photo.jpg')

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function MpProfile({navigation}) {

    const {userAuthenticationToken, email, postcodeUpdated} = React.useContext(AuthContext);
    const [mpData, setMpData] = useState()
    const [searchValue, setSearchValue] = useState("Search for Bill")
    const [billsData, setBillsData] = useState();
    const [refreshing, setRefreshing] = React.useState(false);
    const isUnMounted = React.useRef(false);

    const onRefresh = React.useCallback(() => {
        // Refresh bills on drag down
        getLocalMp()
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getLocalMp()

        return () => {
            isUnMounted.current = true;
        };
    }, [postcodeUpdated]);

    function getLocalMp() {
        const formdata = new FormData();
        formdata.append("email", email)
        formdata.append("session_token", userAuthenticationToken)

        // Gets the local mp for the user
        fetch('https://bills-app-305000.ew.r.appspot.com/local_mp', {
            method: 'POST',
            body: formdata
        })
            .then((res) => res.json())
            .then((responseJson) => {
                if (responseJson["error"]) {
                    if (responseJson["error"] === "invalid_credentials") signOut()
                }
                getMpPhoneNumber(responseJson, responseJson.mp_id)
                updateBillData(responseJson.mp_id)
            }).catch((error) => {
            console.error(error);
        });
    }

    function getMpPhoneNumber(mpData, mp_id) {
        // Get the mps phone number
        fetch("https://members-api.parliament.uk/api/Members/" + mp_id + "/Contact")
            .then((response) => response.text())
            .then((responseText) => {
                let responseJson = JSON.parse(responseText)
                mpData.phone = responseJson.value[0].phone
                getMpName(mpData, mp_id)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getMpName(mpData, mp_id) {
        // Gets the mps name
        fetch("https://members-api.parliament.uk/api/Members/" + mp_id)
            .then((response) => response.text())
            .then((responseText) => {
                let responseJson = JSON.parse(responseText)
                setMpData({...mpData, name: responseJson.value.nameDisplayAs})
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function updateBillData(mp_id) {
        const formdata = new FormData();
        formdata.append("email", email)
        formdata.append("session_token", userAuthenticationToken)
        formdata.append("mp_id", mp_id)

        // Gets the bills that the mp has voted on
        fetch('https://bills-app-305000.ew.r.appspot.com/get_mp_bills', {
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

        // Get a dictionary of how the mp voted on bills
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
                    responseJson.forEach((voteBill) => {
                        if (voteBill.id === bill.id) {
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
                if (!isUnMounted.current) {
                    setBillsData(newBillsData);
                }
            }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <SafeAreaView style={{flex: 1}}>

            {!mpData ? (
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
            ) : (
                <View style={styles.mpInfoSection}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={styles.textSection}>

                            <Text style={styles.mpName}>{mpData.name}</Text>
                            <Text style={styles.mpConstituency}>{mpData.area}</Text>

                            <Text></Text>
                            <Text style={styles.contactDetailsTitle}>Contact Details</Text>
                            <Text style={styles.mpPhoneNumber}>{mpData.phone}</Text>
                            <Text style={styles.mpEmailAddress}>{mpData.email}</Text>
                        </View>
                        <View>
                            <Image style={styles.mpPicture} source={{
                                uri: 'https://members-api.parliament.uk/api/Members/' + mpData.mp_id + '/Portrait?cropType=OneOne',
                            }} defaultSource={no_photo}/>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button style={styles.messageMpButton}
                                color='#4d4d4d'
                                onPress={() => navigateToMpMessage(navigation, mpData)}
                                title="Message"/>
                    </View>
                </View>
            )}

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
                {!billsData ? (
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
                ) : (
                    <BillList data={billsData} navigation={navigation} backPage={"MP Profile"}
                              searchTerm={(searchValue === "Search for Bill") ? "" : searchValue}/>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

function navigateToMpMessage(navigation, data) {
    navigation.navigate("MP Message", data)
}
