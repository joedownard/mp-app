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
    const [billData, setBillData] = useState()


    if (!billData) {
        fetch("https://bills-app-305000.ew.r.appspot.com/bill/" + params.id)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.result)
                setBillData(responseJson.result);
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
                        <View style={styles.billDescriptionSection}>
                            <View style={styles.billDescriptionHeader}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.billDescriptionTitleText}>Bill Description</Text>
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
                                </View>
                                <View style={styles.billHeaderFavouriteDate}>
                                    <Text style={styles.billDescriptionDateText}>{billData.date_added}</Text>
                                </View>
                            </View>
                            <View style={styles.horizontalLine}/>
                            <Text style={styles.billDescriptionText}>{billData.desc}</Text>
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
                                        setBillData({...billData, likes: billData.likes + 1})
                                        setUserInteractions({...userInteractions, liked: true});
                                        onUserInteraction(billData.id, 'like');
                                    } else {
                                        setBillData({...billData, likes: billData.likes - 1})
                                        setUserInteractions({...userInteractions, liked: false});
                                        onUserInteraction(billData.id, 'unlike');
                                    }
                                }}>
                                    <Image style={styles.largeThumbsUp}
                                           source={userInteractions['liked'] ? thumbsUpFilled : thumbsUp}/>
                                </Pressable>
                                <Text style={styles.likesText}>{billData.likes}</Text>
                            </View>
                            <View>
                                <Pressable onPress={() => {
                                    if (!userInteractions['disliked']) {
                                        setBillData({...billData, dislikes: billData.dislikes + 1})
                                        setUserInteractions({...userInteractions, disliked: true});
                                        onUserInteraction(billData.id, 'dislike');
                                    } else {
                                        setBillData({...billData, dislikes: billData.dislikes - 1})
                                        setUserInteractions({...userInteractions, disliked: false});
                                        onUserInteraction(billData.id, 'undislike');
                                    }
                                }}>
                                    <Image style={styles.largeThumbsDown}
                                           source={userInteractions['disliked'] ? thumbsDownFilled : thumbsDown}/>
                                </Pressable>
                                <Text style={styles.dislikesText}>{billData.dislikes}</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                )
            }
        </View>
    );
}

function onUserInteraction(billId, interaction) {

    //communicate the interaction with the backend here
    console.log(`User performed interaction ${interaction} on bill with id ${billId}`)
}
