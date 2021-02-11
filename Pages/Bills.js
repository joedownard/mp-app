import { Text, View, Image, ScrollView, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { styles } from './Stylesheets/BillsStyles.js';

export default function Bills() {

    const [billData, setBillData] = useState([{ id:1, name: 'Bill 1 Name', date: '12/02/2019', billDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut', likes: 15, dislikes: 40, shares: 20 }, { id: 2, name: 'Bill 2 Name', date: '26/02/2020', billDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut', likes: 15, dislikes: 40, shares: 20 }]);

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
                <StatusBar style="auto" />
            </View>
        );
    }

    if (billData) {
        return (
            <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <BillList data={billData} />
                <StatusBar style="auto" />
            </ScrollView>
            </SafeAreaView>
        );
    }
}


function BillList(props) {
    const billItemList = props.data.map((item) =>
        <BillItem key={item.id} name={item.name} date={item.date} billDescription={item.billDescription} likes={item.likes} dislikes={item.dislikes} shares={item.shares} />
    );

    return (
        <View>
            {billItemList}
        </View>
    )
}

function BillItem(props) {
    return (
        <View style={styles.billContainer}>
            <View style={styles.billHeader}>
                <View>
                    <Text style={styles.billTitle}> {props.name} </Text>
                </View>
                <View style={styles.billHeaderFavouriteDate}>
                    <Image style={styles.favouriteButton} source={require('../assets/favourite_icon.png')} />
                    <Text style={styles.dateText}>{props.date}</Text>
                </View>
            </View>
            <View style={styles.horizontalLine} />
            <Text style={styles.billDescription}>{props.billDescription}</Text>
            <View style={styles.billFooter}>
                <View style={styles.likesContainer}>
                    <Image style={styles.thumbsUp} source={require('../assets/thumbs_up.png')} />
                    <Text style={styles.thumbsUpNumber}>{props.likes}</Text>
                </View>
                <View style={styles.dislikesContainer}>
                    <Image style={styles.thumbsDown} source={require('../assets/thumbs_down.png')} />
                    <Text style={styles.thumbsDownNumber}>{props.dislikes}</Text>
                </View>
                <View style={styles.sharesContainer}>
                    <Text style={styles.shareNumber}>{props.shares}</Text>
                    <Image style={styles.shareButton} source={require('../assets/share_icon.png')} />
                </View>
            </View>
        </View>
    )
}
