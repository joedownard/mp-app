import React from "react";
import {Text, View, Image, SafeAreaView, Button, TextInput, KeyboardAvoidingView, Platform} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import {styles} from './Stylesheets/MpMessageStyles.js';
import AuthContext from "../components/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from "@react-native-picker/picker";



export default function MpMessage({ navigation, route }) {

    const mpData = route.params;

    const [messageValue, onChangeText] = React.useState();

    const { userAuthenticationToken, email } = React.useContext(AuthContext);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.mpInfoSection}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.textSection}>
                        <Text style={styles.mpName}>{mpData.name}</Text>
                        <Text style={styles.mpConstituency}>{mpData.constituency}</Text>
                        <Text style={styles.contactDetailsTitle}>Contact Details</Text>
                        <Text style={styles.mpPhoneNumber}>Phone: {mpData.phoneNumber}</Text>
                        <Text style={styles.mpEmailAddress}>Email: {mpData.emailAddress}</Text>
                    </View>
                    <View>
                        <Image style={styles.mpPicture} source={mpData.mpPicture}/>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                <Button style={styles.votingHistoryButton}
                    color='#4d4d4d'
                    onPress={() => votingHistory(navigation)}
                    title="Voting History"/>
                </View>
            </View>
            <View style={styles.dropDownContainer}>
                <DropDownPicker
                    items={[
                        {label: 'No format', value: 'no_format'},
                        {label: 'Simple Greeting', value: 'simple_greeting'},
                    ]}
                    containerStyle={{height: 30, width: "98%"}}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    style={styles.dropDownBox}
                    globalTextStyle={{fontSize: 16, textAlign: "center"}}
                    defaultValue={'no_format'}
                    onChangeItem={
                        item => onChangeText(updateFormat(item.value))
                    }/>
            </View>
            <View>
                <View style={{flex: 1}}>
                <TextInput
                    style={styles.messageBox}
                    multiline={true}
                    placeholder=" Your Message..."
                    onFocus={(e) => e.target.placeholder=''}
                    onBlur ={(e) => e.target.placeholder=" Your Message..."}
                    onChangeText={text => onChangeText(text)}
                    value={messageValue}
                    />
                </View>
                <View style={styles.bottomButton}>
                    <Button
                        style={styles.messageButton}
                        color='#4d4d4d'
                        onPress={() => {
                            message(messageValue, userAuthenticationToken, email)
                            onChangeText("")
                        }}
                        title="Message"/>
                </View>
            </View>
        </SafeAreaView>
    );
}

function updateFormat(item) {
    logButtonPress("Dropdown Menu: " + item)
    if (item === "simple_greeting") {
        return "Dear Boris Johnson\n\n\n\nKind Regards."
    }
}

function votingHistory(navigation) {
    logButtonPress("Voting History");
    navigation.goBack()
}

function message(messageText, userAuthenticationToken, email) {
    logButtonPress("Message");

    const formdata = new FormData();
    formdata.append("email", email)
    formdata.append("session_token", userAuthenticationToken)
    formdata.append("mp_id", "6005")
    formdata.append("message", messageText)

    fetch('https://bills-app-305000.ew.r.appspot.com/message', {
        method: 'POST',
        body: formdata
    })
        .then((res) => res.text())
        .then((result) => {
            console.log(result)
        });


    console.log(messageText);
    console.log(userAuthenticationToken)
    console.log(email)

    alert("Sent!")
}

function logButtonPress(button) {
    console.log("User Pressed Button:", button);
}
