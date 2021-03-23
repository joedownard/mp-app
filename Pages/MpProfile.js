import {Text, View, Image, ScrollView, SafeAreaView, Button, TextInput} from "react-native";
import React, {useState} from "react";
import {styles} from './Stylesheets/MpProfileStyles.js';
import {BillList} from "../components/BillList";
import AuthContext from "../components/AuthContext.js";
import MpMessage from "./MpMessage.js";

export default function MpProfile({navigation}) {

    const {userAuthenticationToken, email} = React.useContext(AuthContext);

    const mpData = {
        name: 'Boris Johnson',
        constituency: 'Uxbridge and South Ruslip',
        phoneNumber: '020 7219 4682',
        emailAddress: 'boris.johnson.mp@parliament.uk',
        mpPicture: require('../assets/boris_pic.png')
    }

    const [searchValue, setSearchValue] = useState("Search for Bill")

    const [billsData, setBillsData] = useState();
    const [mpVotesData, setMpVotesData] = useState();

    if (!billsData) {
        fetch("https://bills-app-305000.ew.r.appspot.com/bills/1423")
            .then((response) => response.text())
            .then((responseText) => {
                let responseJson = responseText.replaceAll("\'", "\"")
                responseJson = responseJson.replaceAll("None", "\"None\"")
                responseJson = responseJson.substring(1, responseJson.length - 2)
                responseJson = JSON.parse(responseJson)
                console.log(responseJson)
                updateMpVotesData(responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function updateMpVotesData(data) {
        const formdata = new FormData();
        formdata.append("email", email)
        formdata.append("session_token", userAuthenticationToken)
        formdata.append("mp_id", "1423")

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
                        <Image style={styles.mpPicture} source={mpData.mpPicture}/>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Button style={styles.messageMpButton}
                            color='#4d4d4d'
                            onPress={() => navigateToMpMessage(navigation, mpData)}
                            title="Message"/>
                </View>
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
