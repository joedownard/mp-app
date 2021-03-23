import {Image, Pressable, SafeAreaView, Text, View, ScrollView, Linking} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
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
                setBillData({...responseJson, likes: 0, dislikes: 0})
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function toggleLike() {
        if (!userInteractions['liked']) {
            onUserInteraction(params.id, 'like', params.userAuthenticationToken);
            if (userInteractions['disliked']) {
                setBillData({...billData, dislikes: billData.dislikes - 1, likes: billData.likes + 1})
                setUserInteractions({...userInteractions, disliked: false, liked: true});
                onUserInteraction(params.id, 'undislike', params.userAuthenticationToken);
            } else {
                setBillData({...billData, likes: billData.likes + 1})
                setUserInteractions({...userInteractions, liked: true});
            }
        } else {
            setBillData({...billData, likes: billData.likes - 1})
            setUserInteractions({...userInteractions, liked: false});
            onUserInteraction(params.id, 'unlike', params.userAuthenticationToken);
        }
    }

    function toggleDislike() {
        if (!userInteractions['disliked']) {
            onUserInteraction(params.id, 'dislike', params.userAuthenticationToken);
            if (userInteractions['liked']) {
                setBillData({...billData, dislikes: billData.dislikes + 1, likes: billData.likes - 1})
                setUserInteractions({...userInteractions, disliked: true, liked: false});
                onUserInteraction(params.id, 'unlike', params.userAuthenticationToken);
            } else {
                setBillData({...billData, dislikes: billData.dislikes + 1})
                setUserInteractions({...userInteractions, disliked: true});
            }
        } else {
            setBillData({...billData, dislikes: billData.dislikes - 1})
            setUserInteractions({...userInteractions, disliked: false});
            onUserInteraction(params.id, 'undislike', params.userAuthenticationToken);
        }
    }

    if (!billData) {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Text style={styles.loadingDataText}>Loading Data</Text>
            </SafeAreaView>
        )
    } else {
        return (
        <SafeAreaView style={{flex: 1}}>
            <View>
                <Text style={styles.pageTitle}>{billData.title}</Text>
            </View>
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
                    {/*<View style={styles.billHeaderFavouriteDate}>*/}
                    {/*    <Text style={styles.billDescriptionDateText}>{billData.date_added}</Text>*/}
                    {/*</View>*/}
                </View>
                <View style={styles.horizontalLine}/>
                <Text style={styles.billDescriptionText}>{billData.description}</Text>
            </View>


            <View style={styles.billStatusSection}>
                <Text style={styles.billStatusTitleText}>Bill Link</Text>
                <View style={styles.horizontalLine}/>

                <Text style={styles.link}
                      onPress={() => Linking.openURL(billData.link)}>
                    Link to {billData.title}
                </Text>
            </View>

            <View style={styles.messageMPSection}>

            </View>

            <View style={styles.billReactionSection}>
                <View>
                    <Pressable onPress={() => toggleLike()}>
                        <Image style={styles.largeThumbsUp}
                               source={userInteractions['liked'] ? thumbsUpFilled : thumbsUp}/>
                    </Pressable>
                    <Text style={styles.likesText}>{billData.likes}</Text>
                </View>
                <View>
                    <Pressable onPress={() => toggleDislike()}>
                        <Image style={styles.largeThumbsDown}
                               source={userInteractions['disliked'] ? thumbsDownFilled : thumbsDown}/>
                    </Pressable>
                    <Text style={styles.dislikesText}>{billData.dislikes}</Text>
                </View>
            </View>
        </SafeAreaView>)
    }
}

function onUserInteraction(billId, interaction) {

    //communicate the interaction with the backend here
    console.log(`User performed interaction ${interaction} on bill with id ${billId}`)
}
