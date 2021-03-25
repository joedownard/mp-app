import React from "react";
import {Text, View, Image, SafeAreaView, Button, TextInput, Alert} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import {styles} from './Stylesheets/MpMessageStyles.js';
import AuthContext from "../components/AuthContext";

const no_photo = require('../assets/no_photo.jpg')

export default function MpMessage({ navigation, route }) {

    const mpData = route.params;
    const [messageValue, onChangeText] = React.useState();
    const {userAuthenticationToken, email} = React.useContext(AuthContext);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.mpInfoSection}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={styles.textSection}>
                        <Text style={styles.mpName}>{mpData.first_name + " " + mpData.last_name}</Text>
                        <Text style={styles.mpConstituency}>{mpData.area}</Text>

                        <Text></Text>
                        <Text style={styles.contactDetailsTitle}>Contact Details</Text>
                        <Text style={styles.mpPhoneNumber}>{mpData.phone}</Text>
                        <Text style={styles.mpEmailAddress}>{mpData.email}</Text>
                    </View>
                    <View>
                        <Image style={styles.mpPicture} source={{
                            uri: 'https://members-api.parliament.uk/api/Members/' + mpData.mp_id + '/Portrait?cropType=OneOne',
                        }} defaultSource={no_photo}/>
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
                        item => onChangeText(updateFormat(item.value, mpData.name))
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
                            message(messageValue, userAuthenticationToken, email, mpData.name, mpData.mp_id)
                            onChangeText("")
                        }}
                        title="Message"/>
                </View>
            </View>
        </SafeAreaView>
    );
}

function updateFormat(item, name) {
    logButtonPress("Dropdown Menu: " + item)
    if (item === "simple_greeting") {
        return "Dear "+ name +",\n\n\n\nKind Regards,\nyour local constituent."
    }
}

function votingHistory(navigation) {
    logButtonPress("Voting History");
    navigation.goBack()
}

function message(messageText, userAuthenticationToken, email, name, mpId) {
    logButtonPress("Message");

    const formdata = new FormData();
    formdata.append("email", email)
    formdata.append("session_token", userAuthenticationToken)
    formdata.append("mp_id", mpId)
    formdata.append("message", messageText)

    // Send the message to the server
    fetch('https://bills-app-305000.ew.r.appspot.com/message', {
        method: 'POST',
        body: formdata
    })
        .then((res) => res.text())
        .then((result) => {
            console.log(result)
            Alert.alert(
                "Success",
                "Your message has been sent to " + name,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        });
}

function logButtonPress(button) {
    console.log("User Pressed Button:", button);
}
