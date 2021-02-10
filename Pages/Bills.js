import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";

export default function Bills() {

    const [billData, setBillData] = useState(false);

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


function BillList () {
    const billItemList = data.map((item) =>
        <BillItem name={item.name}/>
    );

    return (
        <View>
            {billItemList}
        </View>
    )
}

function BillItem () {
    return (
        <View>{props.name}</View>
    )
}
