import {Image, Pressable, SafeAreaView, Text, View, ScrollView} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {styles} from './Stylesheets/BillDetailsStyles.js';


const thumbsUp = require('../assets/large_thumbs_up.png');
const thumbsUpFilled = require('../assets/large_thumbs_up_filled.png');
const thumbsDown = require('../assets/large_thumbs_down.png');
const thumbsDownFilled = require('../assets/large_thumbs_down_filled.png');
const favourite = require('../assets/favourite_icon.png');
const favouriteFilled = require('../assets/favourite_icon_filled.png');

const share = require('../assets/share_icon.png')
const back = require('../assets/back_button_icon.png')

export default function BillDetails({route, navigation}) {

    const params = route.params;

    const [userInteractions, setUserInteractions] = useState({});
    const [billData, setBillData] = useState({
        "id": 1,
        "name": "Bill 1 Name",
        "date": "12/02/2019",
        "likes": 102,
        "dislikes": 168,
        "shares": 57,
        "billDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
    });

    if (!billData) {
        fetch("http://localhost:80/mpapp/bills")
            .then((response) => response.json())
            .then((responseJson) => {
                setBillData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.pageTitleSection}>
                    <Pressable onPress={() => {
                        navigation.goBack()
                    }}>
                        <Image style={styles.backButton} source={back}/>
                    </Pressable>
                    <View>
                        <Text style={styles.pageTitle}>Bill Details</Text>
                    </View>
                    <Image style={styles.shareButton}/>
                </View>
                <View style={styles.pageTitleLine}/>
                <Text style={styles.loadingDataText}>Loading Data</Text>
            </SafeAreaView>
        );
    }

    if (billData) {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.pageTitleSection}>
                    <Pressable onPress={() => {
                        navigation.goBack()
                    }}>
                        <Image style={styles.backButton} source={back}/>
                    </Pressable>
                    <View style={{flexDirection: 'row'}}>
                        <Pressable onPress={() => {
                            if (!userInteractions['favourited']) {
                                setUserInteractions({...userInteractions, favourited: true});
                                onUserInteraction(billData.id, 'favourite');
                            } else {
                                setUserInteractions({...userInteractions, favourited: false});
                                onUserInteraction(billData.id, 'unfavourite');
                            }
                        }}>
                            <Image style={styles.favouriteButton}
                                   source={userInteractions['favourited'] ? favouriteFilled : favourite}/>
                        </Pressable>
                        <Text style={styles.pageTitle}>{billData.name}</Text>
                    </View>
                    <Image style={styles.shareButton} source={share}/>
                </View>
                <View style={styles.horizontalLine}/>
                <View style={styles.billDescriptionSection}>
                    <View style={styles.billDescriptionHeader}>
                        <Text style={styles.billDescriptionTitleText}>Bill Description</Text>
                        <View style={styles.billHeaderFavouriteDate}>
                            <Text style={styles.billDescriptionDateText}>{billData.date}</Text>
                        </View>
                    </View>
                    <View style={styles.horizontalLine}/>
                    <Text style={styles.billDescriptionText}>{billData.billDescription}</Text>
                </View>


                <View style={styles.billStatusSection}>
                    <Text style={styles.billStatusTitleText}>Bill Status</Text>
                    <View style={styles.horizontalLine}/>
                </View>

                <View style={styles.messageMPSection}>

                </View>

                <View style={styles.billReactionSection}>
                    <View>
                        <Pressable onPress={() => {
                            if (!userInteractions['liked']) {
                                setBillData({...billData, likes: billData.likes+1})
                                setUserInteractions({...userInteractions, liked: true});
                                onUserInteraction(billData.id, 'like');
                            } else {
                                setBillData({...billData, likes: billData.likes-1})
                                setUserInteractions({...userInteractions, liked: false});
                                onUserInteraction(billData.id, 'unlike');
                            }
                        }}>
                            <Image style={styles.largeThumbsUp} source={userInteractions['liked'] ? thumbsUpFilled : thumbsUp} />
                        </Pressable>
                        <Text style={styles.likesText}>{billData.likes}</Text>
                    </View>
                    <View>
                        <Pressable onPress={() => {
                            if (!userInteractions['disliked']) {
                                setBillData({...billData, dislikes: billData.dislikes+1})
                                setUserInteractions({...userInteractions, disliked: true});
                                onUserInteraction(billData.id, 'dislike');
                            } else {
                                setBillData({...billData, dislikes: billData.dislikes-1})
                                setUserInteractions({...userInteractions, disliked: false});
                                onUserInteraction(billData.id, 'undislike');
                            }
                        }}>
                            <Image  style={styles.largeThumbsDown} source={userInteractions['disliked'] ? thumbsDownFilled : thumbsDown} />
                        </Pressable>
                        <Text style={styles.dislikesText}>{billData.dislikes}</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

function onUserInteraction(billId, interaction) {

    //communicate the interaction with the backend here
    console.log(`User performed interaction ${interaction} on bill with id ${billId}`)
}
