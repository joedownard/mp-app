import {Text, View, Image, ScrollView, SafeAreaView, Pressable} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useRef, useState} from "react";
import {styles} from './Stylesheets/BillsStyles.js';

import {BillList} from '../components/BillList.js'

export default function Bills({navigation}) {

    const [billsData, setBillsData] = useState()

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
    }

    return (
        <View>
            {!billData ?
                (<SafeAreaView style={{flex: 1}}>
                <Text style={styles.loadingDataText}>Loading Data</Text>
                </SafeAreaView>)
                : (
                    <SafeAreaView style={{flex: 1}}>
                        <ScrollView>
                            <BillList data={billsData} navigation={navigation} backPage={"Bill Feed"} searchTerm={""}/>
                            <StatusBar style="auto"/>
                        </ScrollView>
                    </SafeAreaView>
                )
            }
        </View>
    );
}
