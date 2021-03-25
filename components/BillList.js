import {Image, Pressable, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {styles} from "../Pages/Stylesheets/BillsStyles";
import AuthContext from "./AuthContext.js";
import {ScrollView} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const thumbsUp = require('../assets/thumbs_up.png');
const thumbsUpFilled = require('../assets/thumbs_up_filled.png');
const thumbsDown = require('../assets/thumbs_down.png');
const thumbsDownFilled = require('../assets/thumbs_down_filled.png');
const favourite = require('../assets/favourite_icon.png');
const favouriteFilled = require('../assets/favourite_icon_filled.png');
const share = require('../assets/share_icon.png')

export function BillList(props) {
    const {userAuthenticationToken, email} = React.useContext(AuthContext);

    // Create a bill listing for every bill in the dataset
    const [data, setData] = useState(props.data)

    useEffect(() => {
        if (props.searchTerm !== "") {
            let tempData = []
            props.data.forEach((item) => {
                if (item.title.toUpperCase().includes(props.searchTerm.toUpperCase()) || item.short_desc.toUpperCase().includes(props.searchTerm.toUpperCase())) {
                    tempData.push(item)
                }
            })
            setData(tempData)
        } else {
            setData(props.data)
        }
    }, [props.data, props.searchTerm]);

    const billItemList = data.map((item) =>
        <BillItem key={item.id} userAuthenticationToken={userAuthenticationToken} email={email} backPage={props.backPage}
                  navigation={props.navigation} id={item.id} name={item.title} date={item.date_added}
                  billDescription={item.short_desc} likes={item.likes} dislikes={item.dislikes}
                  shares={item.shares} mpVote={item.voted} like_state={item.like_state}/>
    );

    return (
        <View style={{marginBottom: 10}}>
            {billItemList}
        </View>
    )
}

function BillItem(props) {
    const [data, setData] = useState(props);
    const [userInteractions, setUserInteractions] = useState({disliked: props.like_state === 0, liked: props.like_state === 1});

    function toggleLike() {
        if (!userInteractions['liked']) {
            if (userInteractions['disliked']) {
                setData({...data, dislikes: data.dislikes - 1, likes: data.likes + 1})
                setUserInteractions({...userInteractions, disliked: false, liked: true});
                onUserInteraction(props.id, 'like', props.userAuthenticationToken, props.email);
            } else {
                setData({...data, likes: data.likes + 1})
                setUserInteractions({...userInteractions, liked: true});
                onUserInteraction(props.id, 'like', props.userAuthenticationToken, props.email);
            }
        } else {
            setData({...data, likes: data.likes - 1})
            setUserInteractions({...userInteractions, liked: false});
            onUserInteraction(props.id, 'unlike', props.userAuthenticationToken, props.email);
        }
    }

    function toggleDislike() {
        if (!userInteractions['disliked']) {
            if (userInteractions['liked']) {
                setData({...data, dislikes: data.dislikes + 1, likes: data.likes - 1})
                setUserInteractions({...userInteractions, disliked: true, liked: false});
                onUserInteraction(props.id, 'dislike', props.userAuthenticationToken, props.email);
            } else {
                setData({...data, dislikes: data.dislikes + 1})
                setUserInteractions({...userInteractions, disliked: true});
                onUserInteraction(props.id, 'dislike', props.userAuthenticationToken, props.email);
            }
        } else {
            setData({...data, dislikes: data.dislikes - 1})
            setUserInteractions({...userInteractions, disliked: false});
            onUserInteraction(props.id, 'undislike', props.userAuthenticationToken, props.email);
        }
    }

    return (
        <View style={styles.billContainer}>
            <View style={styles.billHeader}>
                <ScrollView horizontal={true}>
                    <Pressable onPress={() => {
                        props.navigation.navigate("Bill Details", {id: data.id, backPage: props.backPage})
                    }}>
                        <Text style={styles.billTitle}> {data.name} </Text>
                    </Pressable>
                </ScrollView>
                <View style={styles.billHeaderFavouriteDate}>
                    <Pressable onPress={() => {
                        if (!userInteractions['favourited']) {
                            setUserInteractions({...userInteractions, favourited: true});
                            onUserInteraction(props.id, 'favourite', props.userAuthenticationToken, props.email);
                        } else {
                            setUserInteractions({...userInteractions, favourited: false});
                            onUserInteraction(props.id, 'unfavourite', props.userAuthenticationToken, props.email);
                        }
                    }}>
                        <Image style={styles.favouriteButton}
                               source={userInteractions['favourited'] ? favouriteFilled : favourite}/>
                    </Pressable>
                    <Text style={styles.dateText}>{data.date !== "None" ? data.date : "Unknown"}</Text>
                </View>
            </View>
            <View style={styles.horizontalLine}/>
            <Text style={styles.billDescription}>{data.billDescription}</Text>
            <View style={styles.billFooter}>
                <View style={styles.likesContainer}>
                    <Pressable onPress={() => toggleLike()}>
                        <Image style={styles.thumbsUp}
                               source={userInteractions['liked'] ? thumbsUpFilled : thumbsUp}/>
                    </Pressable>
                    <Text style={styles.thumbsUpNumber}>{data.likes}</Text>
                </View>
                <View style={styles.dislikesContainer}>
                    <Pressable onPress={() => toggleDislike()}>
                        <Image style={styles.thumbsDown}
                               source={userInteractions['disliked'] ? thumbsDownFilled : thumbsDown}/>
                    </Pressable>
                    <Text style={styles.thumbsDownNumber}>{data.dislikes}</Text>
                </View>
                    <View style={styles.mpVotedStatus}>
                        <Text style={styles.mpVotedText}>Your MP {data.mpVote}</Text>
                    </View>
            </View>
        </View>
    )

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

            fetch('https://bills-app-305000.ew.r.appspot.com/add_vote', {
                method: 'POST',
                body: formdata
            })
                .then((res) => res.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson["error"]) {
                        if (responseJson["error"] === "invalid_credentials") signOut()
                    }
                }).catch((error) => {
                console.error(error);
            });
        }

        //communicate the interaction with the backend here
        console.log(`User with token ${userAuthenticationToken} performed interaction ${interaction} on bill with id ${billId}`)
    }

}
