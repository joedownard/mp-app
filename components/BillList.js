import {Image, Pressable, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {styles} from "../Pages/Stylesheets/BillsStyles";
import AuthContext from "./AuthContext.js";
import { ScrollView } from "react-native-gesture-handler";

const thumbsUp = require('../assets/thumbs_up.png');
const thumbsUpFilled = require('../assets/thumbs_up_filled.png');
const thumbsDown = require('../assets/thumbs_down.png');
const thumbsDownFilled = require('../assets/thumbs_down_filled.png');
const favourite = require('../assets/favourite_icon.png');
const favouriteFilled = require('../assets/favourite_icon_filled.png');
const share = require('../assets/share_icon.png')

export function BillList(props) {
    const { userAuthenticationToken } = React.useContext(AuthContext);

    // Create a bill listing for every bill in the dataset
    const [data, setData] = useState(props.data)

    useEffect(() => {
        console.log("test")
        if (props.searchTerm !== "") {
            let tempData = []
            props.data.forEach( (item) => {
                if (item.name.toUpperCase().includes(props.searchTerm.toUpperCase()) || item.billDescription.toUpperCase().includes(props.searchTerm.toUpperCase())) {
                    tempData.push(item)
                }
            })
            setData(tempData)
        } else {
            setData(props.data)
        }
    }, [props.data, props.searchTerm]);

    const billItemList = data.map((item) =>
        <BillItem key={item.id} userAuthenticationToken={userAuthenticationToken} backPage={props.backPage} navigation={props.navigation} id={item.id} name={item.title} date={item.date_added}
                  billDescription={item.desc} likes={item.likes} dislikes={item.dislikes}
                  shares={item.shares}/>
    );

    return (
        <View style={{marginBottom: 10}}>
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
                            onUserInteraction(props.id, 'favourite');
                        } else {
                            setUserInteractions({...userInteractions, favourited: false});
                            onUserInteraction(props.id, 'unfavourite');
                        }
                    }}>
                        <Image style={styles.favouriteButton}
                               source={userInteractions['favourited'] ? favouriteFilled : favourite}/>
                    </Pressable>
                    <Text style={styles.dateText}>{data.date}</Text>
                </View>
            </View>
            <View style={styles.horizontalLine}/>
            <Text style={styles.billDescription}>{data.billDescription}</Text>
            <View style={styles.billFooter}>
                <View style={styles.likesContainer}>
                    <Pressable onPress={() => {
                        if (!userInteractions['liked']) {
                            setData({...data, likes: data.likes + 1})
                            setUserInteractions({...userInteractions, liked: true});
                            onUserInteraction(props.id, 'like', props.userAuthenticationToken);
                        } else {
                            setData({...data, likes: data.likes - 1})
                            setUserInteractions({...userInteractions, liked: false});
                            onUserInteraction(props.id, 'unlike', props.userAuthenticationToken);
                        }
                    }}>
                        <Image style={styles.thumbsUp}
                               source={userInteractions['liked'] ? thumbsUpFilled : thumbsUp}/>
                    </Pressable>
                    <Text style={styles.thumbsUpNumber}>{data.likes}</Text>
                </View>
                <View style={styles.dislikesContainer}>
                    <Pressable onPress={() => {
                        if (!userInteractions['disliked']) {
                            setData({...data, dislikes: data.dislikes + 1})
                            setUserInteractions({...userInteractions, disliked: true});
                            onUserInteraction(props.id, 'dislike', props.userAuthenticationToken);
                        } else {
                            setData({...data, dislikes: data.dislikes - 1})
                            setUserInteractions({...userInteractions, disliked: false});
                            onUserInteraction(props.id, 'undislike', props.userAuthenticationToken);
                        }
                    }}>
                        <Image style={styles.thumbsDown}
                               source={userInteractions['disliked'] ? thumbsDownFilled : thumbsDown}/>
                    </Pressable>
                    <Text style={styles.thumbsDownNumber}>{data.dislikes}</Text>
                </View>
                <View style={styles.sharesContainer}>
                    <Text style={styles.shareNumber}>{data.shares}</Text>
                    <Image style={styles.shareButton} source={share}/>
                </View>
            </View>
        </View>
    )
    function onUserInteraction(billId, interaction, userAuthenticationToken) {

        //communicate the interaction with the backend here
        console.log(`User with token ${userAuthenticationToken} performed interaction ${interaction} on bill with id ${billId}`)
    }

}
