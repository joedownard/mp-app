import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {styles} from './Stylesheets/BillsStyles.js';

export default function Bills() {

    const [billData, setBillData] = useState([{name: 'Bill 1 Name', date: '12/02/2019', billDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut'}, {name: 'Bill 2 Name', date: '26/02/2020', billDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut'}]);

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
        <BillItem name={item.name} date={item.date} billDescription={item.billDescription}/>
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
            <View style={styles.billHeader}>
                <Text style={styles.billTitle}> {props.name} </Text>
                <Text style={styles.billHeaderRightSection}>{props.date}</Text>
            </View>
            <View style={styles.horizontalLine}/>
            <Text style={styles.billDescription} includeFontPadding={false}> {props.billDescription} </Text>
        </View>
    )
}
