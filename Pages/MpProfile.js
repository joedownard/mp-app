import {Text, View, Image, ScrollView, SafeAreaView, Button, TextInput} from "react-native";
import React, {useEffect, useState} from "react";
import {styles} from './Stylesheets/MpProfileStyles.js';
import {BillList} from "../components/BillList";
import AuthContext from "../components/AuthContext.js";
import MpMessage from "./MpMessage.js";

const no_photo = require('../assets/no_photo.jpg')

export default function MpProfile({navigation}) {

    const {userAuthenticationToken, email, postcodeUpdated, postcodeUpdateConfirm} = React.useContext(AuthContext);
    const [mpData, setMpData] = useState()
    const [searchValue, setSearchValue] = useState("Search for Bill")
    const [billsData, setBillsData] = useState();

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
                getMpPhoneNumber(responseJson, responseJson.mp_id)
                updateBillData(responseJson.mp_id)
            }).catch((error) => {
            console.error(error);
        });
    }, [postcodeUpdated]);

    function getMpPhoneNumber (mpData, mp_id) {
        fetch("https://members-api.parliament.uk/api/Members/" + mp_id + "/Contact")
            .then((response) => response.text())
            .then((responseText) => {
                let responseJson = JSON.parse(responseText)
                console.log(mpData)
                setMpData({...mpData, phone: responseJson.value[0].phone})
                console.log(responseJson.value[0].phone)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function updateBillData(mp_id) {
        fetch("https://bills-app-305000.ew.r.appspot.com/bills/" + mp_id)
            .then((response) => response.text())
            .then((responseText) => {
                let responseJson = JSON.parse(responseText)
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

                let newBillsData = []

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
                setBillsData(newBillsData);
            }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <SafeAreaView style={{flex: 1}}>

            {!mpData ? (
                <SafeAreaView style={{flex: 1}}>
                    <Text style={styles.loadingDataText}>Loading Data</Text>
                </SafeAreaView>
            ) : (
                <View style={styles.mpInfoSection}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={styles.textSection}>

                            <Text style={styles.mpName}>{mpData.first_name + " " + mpData.last_name}</Text>
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
                        <Text style={styles.loadingDataText}>Loading Data</Text>
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
