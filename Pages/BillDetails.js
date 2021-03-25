import {Image, Pressable, SafeAreaView, Text, View, ScrollView, Linking} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {styles} from './Stylesheets/BillDetailsStyles.js';
import AuthContext from "../components/AuthContext";


const thumbsUp = require('../assets/large_thumbs_up.png');
const thumbsUpFilled = require('../assets/large_thumbs_up_filled.png');
const thumbsDown = require('../assets/large_thumbs_down.png');
const thumbsDownFilled = require('../assets/large_thumbs_down_filled.png');
const favourite = require('../assets/favourite_icon.png');
const favouriteFilled = require('../assets/favourite_icon_filled.png');

export default function BillDetails({route, navigation}) {

    const params = route.params;

    const [userInteractions, setUserInteractions] = useState({});
    const {userAuthenticationToken, email, signOut} = React.useContext(AuthContext);
    const [billData, setBillData] = useState()


    useEffect(() => {
        const formdata = new FormData();
        formdata.append("email", email)
        formdata.append("session_token", userAuthenticationToken)
        formdata.append("bill_id", params.id)

        fetch('https://bills-app-305000.ew.r.appspot.com/get_bill', {
            method: 'POST',
            body: formdata
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson["error"]) {
                    if (responseJson["error"] === "invalid_credentials") signOut()
                }
                setUserInteractions({...userInteractions, disliked: responseJson.user_vote === 0, liked: responseJson.user_vote === 1})
                setBillData(responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Toggle Like on/off (Toggle dislike off too if that is on)
    function toggleLike() {
        if (!userInteractions['liked']) {
            if (userInteractions['disliked']) {
                setBillData({...billData, dislikes: billData.dislikes - 1, likes: billData.likes + 1})
                setUserInteractions({...userInteractions, disliked: false, liked: true});
                onUserInteraction(params.id, 'like', userAuthenticationToken, email);
            } else {
                setBillData({...billData, likes: billData.likes + 1})
                setUserInteractions({...userInteractions, liked: true});
                onUserInteraction(params.id, 'like', userAuthenticationToken, email);
            }
        } else {
            setBillData({...billData, likes: billData.likes - 1})
            setUserInteractions({...userInteractions, liked: false});
            onUserInteraction(params.id, 'unlike', userAuthenticationToken, email);
        }
    }

    function toggleDislike() {
        if (!userInteractions['disliked']) {
            if (userInteractions['liked']) {
                setBillData({...billData, dislikes: billData.dislikes + 1, likes: billData.likes - 1})
                setUserInteractions({...userInteractions, disliked: true, liked: false});
                onUserInteraction(params.id, 'dislike', userAuthenticationToken, email);
            } else {
                setBillData({...billData, dislikes: billData.dislikes + 1})
                setUserInteractions({...userInteractions, disliked: true});
                onUserInteraction(params.id, 'dislike', userAuthenticationToken, email);
            }
        } else {
            setBillData({...billData, dislikes: billData.dislikes - 1})
            setUserInteractions({...userInteractions, disliked: false});
            onUserInteraction(params.id, 'undislike', userAuthenticationToken, email);
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
            <ScrollView>
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
                </View>
                <View style={styles.horizontalLine}/>
                <Text style={styles.billDescriptionText}>{billData.short_desc}</Text>
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
            </ScrollView>
        </SafeAreaView>)
    }
}

function onUserInteraction(billId, interaction, userAuthenticationToken, email) {
    if (interaction === "like" || interaction === "unlike" || interaction === "dislike" || interaction === "undislike") {
        let positive;
        if (interaction === "like") {
            positive = 1
        } else if (interaction === "dislike") {
            positive = 0
        } else if (interaction === "unlike" || interaction === "undislike") {
            positive = 2
        }

        const formdata = new FormData();
        formdata.append("email", email)
        formdata.append("session_token", userAuthenticationToken)
        formdata.append("bill_id", billId)
        formdata.append("positive", positive)

        fetch('https://bills-app-305000.ew.r.appspot.com/set_user_vote', {
            method: 'POST',
            body: formdata
        })
            .then((res) => res.json())
            .then((responseJson) => {
                // If the session token has expired sign the user out
                if (responseJson["error"]) {
                    if (responseJson["error"] === "invalid_credentials") signOut()
                }
            }).catch((error) => {
            console.error(error);
        });
    }

    console.log(`User performed interaction ${interaction} on bill with id ${billId}`)
}
