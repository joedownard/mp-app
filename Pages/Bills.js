import { Text, View, Image, ScrollView, SafeAreaView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { styles } from './Stylesheets/BillsStyles.js';

const thumbsUp = require('../assets/thumbs_up.png');
const thumbsUpFilled = require('../assets/thumbs_up_filled.png');
const thumbsDown = require('../assets/thumbs_down.png');
const thumbsDownFilled = require('../assets/thumbs_down_filled.png');
const favourite = require('../assets/favourite_icon.png');
const favouriteFilled = require('../assets/favourite_icon_filled.png');
const share = require('../assets/share_icon.png')

export default function Bills({navigation}) {

    const [billsData, setBillsData] = useState([
        {
            "id": 1,
            "name": "Bill 1 Name",
            "date": "12/02/2019",
            "likes": 102,
            "dislikes": 168,
            "shares": 57,
            "billDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
        },
        {
            "id": 2,
            "name": "Bill 2 Name",
            "date": "06/06/2018",
            "likes": 5,
            "dislikes": 7,
            "shares": 2,
            "billDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
        },
        {
            "id": 3,
            "name": "Bill 3 Name",
            "date": "21/08/2018",
            "likes": 46,
            "dislikes": 22,
            "shares": 19,
            "billDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
        },
        {
            "id": 4,
            "name": "Bill 4 Name",
            "date": "13/11/2018",
            "likes": 55,
            "dislikes": 12,
            "shares": 35,
            "billDescription": "My name jeff"
        }
    ]);


    if (!billsData) {
        fetch("http://localhost:80/mpapp/bills")
            .then((response) => response.json())
            .then((responseJson) => {
                setBillsData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.pageTitleSection}>
                    <View>
                        <Text style={styles.pageTitle}>Bill Feed</Text>
                    </View>
                </View>
                <View style={styles.pageTitleLine}/>
                <Text style={styles.loadingDataText}>Loading Data</Text>
            </SafeAreaView>
        );
    }

    // If the bill data is loaded, then display the list of bills
    if (billsData) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.pageTitleSection}>
                    <Text style={styles.pageTitle}>Bill Feed</Text>
                </View>
                <View style={styles.pageTitleLine}/>
                <ScrollView>
                    <BillList data={billsData} navigation={navigation}/>
                    <StatusBar style="auto" />
                </ScrollView>
            </SafeAreaView>
        );
    }
}


function BillList(props) {
    // Create a bill listing for every bill in the dataset
    const billItemList = props.data.map((item) =>
        <BillItem key={item.id} navigation={props.navigation} id={item.id} name={item.name} date={item.date} billDescription={item.billDescription} likes={item.likes} dislikes={item.dislikes} shares={item.shares} />
    );

    return (
        <View>
            {billItemList}
        </View>
    )
}

function BillItem(props) {
    const [data, setData] = useState(props);
    const [userInteractions, setUserInteractions] = useState({});

    return (
        <View style={styles.billContainer}>
            <View style={styles.billHeader}>
                <View>
                    <Pressable onPress={() => {props.navigation.navigate("Bill Details", {id: data.id})}}>
                    <Text style={styles.billTitle}> {data.name} </Text>
                    </Pressable>
                </View>
                <View style={styles.billHeaderFavouriteDate}>
                    <Pressable onPress={() => {
                        if (!userInteractions['favourited']) {
                            setUserInteractions({...userInteractions, favourited: true});
                            onUserInteraction(props.id, 'favourite');
                        } else {
                            setUserInteractions({...userInteractions, favourited: false});
                            onUserInteraction(props.id, 'unfavourite');
                        }
                    }}>
                        <Image style={styles.favouriteButton} source={userInteractions['favourited'] ? favouriteFilled : favourite} />
                    </Pressable>
                    <Text style={styles.dateText}>{data.date}</Text>
                </View>
            </View>
            <View style={styles.horizontalLine} />
            <Text style={styles.billDescription}>{data.billDescription}</Text>
            <View style={styles.billFooter}>
                <View style={styles.likesContainer}>
                    <Pressable onPress={() => {
                        if (!userInteractions['liked']) {
                            setData({...data, likes: data.likes+1})
                            setUserInteractions({...userInteractions, liked: true});
                            onUserInteraction(props.id, 'like');
                        } else {
                            setData({...data, likes: data.likes-1})
                            setUserInteractions({...userInteractions, liked: false});
                            onUserInteraction(props.id, 'unlike');
                        }
                    }}>
                        <Image style={styles.thumbsUp} source={userInteractions['liked'] ? thumbsUpFilled : thumbsUp} />
                    </Pressable>
                    <Text style={styles.thumbsUpNumber}>{data.likes}</Text>
                </View>
                <View style={styles.dislikesContainer}>
                <Pressable onPress={() => {
                        if (!userInteractions['disliked']) {
                            setData({...data, dislikes: data.dislikes+1})
                            setUserInteractions({...userInteractions, disliked: true});
                            onUserInteraction(props.id, 'dislike');
                        } else {
                            setData({...data, dislikes: data.dislikes-1})
                            setUserInteractions({...userInteractions, disliked: false});
                            onUserInteraction(props.id, 'undislike');
                        }
                    }}>
                    <Image style={styles.thumbsDown} source={userInteractions['disliked'] ? thumbsDownFilled : thumbsDown} />
                    </Pressable>
                    <Text style={styles.thumbsDownNumber}>{data.dislikes}</Text>
                </View>
                <View style={styles.sharesContainer}>
                    <Text style={styles.shareNumber}>{data.shares}</Text>
                    <Image style={styles.shareButton} source={share} />
                </View>
            </View>
        </View>
    )
}

// Handle user interactions with buttons
function onUserInteraction (billId, interaction) {

    //communicate the interaction with the backend here
    console.log(`User performed interaction ${interaction} on bill with id ${billId}`)
}
