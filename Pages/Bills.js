import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {styles} from './Stylesheets/BillsStyles.js';

export default function Bills() {

    const [billData, setBillData] = useState([{name: 'Bill 1 Name', billDescription: 'Bill 1 Description'}, {name: 'Bill 2 Name', billDescription: 'Bill 2 Description'}]);

    if (!billData) {
        fetch("localhost:8080/get_bill/?<bill_id>&<meta_info>")
            .then((response) => response.json())
            .then((responseJson) => {
                setBillData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

        return (
            <View>
                <Text>data loading!</Text>
                <StatusBar style="auto"/>
            </View>
        );
    }

    if (billData) {
        return (
            <View>
                <BillList data={billData} />
                <StatusBar style="auto"/>
            </View>
        );
    }
}


function BillList (props) {
    const billItemList = props.data.map((item) =>
        <BillItem name={item.name} billDescription={item.billDescription}/>
    );

    return (
        <View>
            {billItemList}
        </View>
    )
}

function BillItem (props) {
    return (
        <View style={styles.billContainer}>
            <Text style={styles.billTitle}> {props.name} </Text>
            <Text style={styles.billDescription}> {props.billDescription} </Text>
        </View>
    )
}
