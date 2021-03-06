import {Text, View, SafeAreaView, TextInput, TouchableOpacity, Switch, Alert} from "react-native";
import React, {useState} from "react";
import {styles} from './Stylesheets/PreferencesStyles.js';
import AuthContext from "../components/AuthContext";


export default function Preferences({navigation}) {

    const {signOut, postcodeUpdate} = React.useContext(AuthContext);
    const [value, onChangeText] = React.useState("");
    const {userAuthenticationToken, email} = React.useContext(AuthContext);

    const PostCodeButton = () => {

        return (
            <TouchableOpacity
                style={[styles.button, styles.updatePostcodeButton]}
                onPress={() => updatePostcode(value)}>
                <Text style={styles.buttonText}>
                    Update PostCode
                </Text>
            </TouchableOpacity>
        );
    }

    const LogOutButton = () => {

        return (
            <TouchableOpacity
                style={[styles.button, styles.logOutButton]}
                onPress={() => signOut()}>
                <Text style={styles.buttonText}>
                    Log Out
                </Text>
            </TouchableOpacity>
        );
    }

    const SwitchUsersButton = () => {

        return (
            <TouchableOpacity
                style={[styles.button, styles.switchUserButton]}
                onPress={() => signOut()}>
                <Text style={styles.buttonText}>
                    Switch Users
                </Text>
            </TouchableOpacity>
        );
    }

    const NotificationSwitch = ({styleSwitch, ID}) => {
        const [isEnabled, setIsEnabled] = useState(true);
        const toggleSwitch = () => {
            setIsEnabled(previousState => !previousState);
            toggleNotification(ID, !isEnabled);
        }

        return (
            <Switch
                style={styleSwitch}
                trackColor={{false: "#c4c4c4", true: "#4d4d4d"}}
                thumbColor={"#ffffff"}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        );
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.mainContainer}>
                <View style={styles.postcodeTextBoxContainer}>
                    <Text style={styles.postcodeText}>PostCode</Text>
                    <TextInput
                        style={styles.postcodeTextBox}
                        placeholder="PostCode"
                        autoCapitalize="characters"
                        onChangeText={text => onChangeText(text.toString().toUpperCase())}
                        value={value}
                        autoCompleteType="postal-code"
                        maxLength={8}
                    />
                </View>
                <PostCodeButton/>
                <Text style={styles.notificationText}>Notifications</Text>
                <View style={styles.switchContainer}>
                    <NotificationSwitch styleSwitch={styles.billStatusSwitch} ID='1'/>
                    <Text style={styles.billStatusText}>Bill Status</Text>
                </View>
                <View style={styles.switchContainer}>
                    <NotificationSwitch styleSwitch={styles.localMPSwitch} ID='2'/>
                    <Text style={styles.localMPText}>Local MP Votes</Text>
                </View>
                <LogOutButton/>
                <SwitchUsersButton/>
            </View>
        </SafeAreaView>
    );

    function updatePostcode(value) {
        logButtonPress("Update PostCode");
        if (valid_postcode(value)) {
            const formdata = new FormData();
            formdata.append("email", email)
            formdata.append("session_token", userAuthenticationToken)
            formdata.append("postcode", value)

            // Send the new postcode to the server
            fetch('https://bills-app-305000.ew.r.appspot.com/update_postcode', {
                method: 'POST',
                body: formdata
            })
                .then((res) => res.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson["error"]) {
                        if (responseJson["error"] === "invalid_credentials") signOut()
                        if (responseJson["error"] === "invalid_postcode") {
                            Alert.alert(
                                "Error",
                                "Invalid Postcode",
                                [
                                    {text: "OK", onPress: () => console.log("OK Pressed")}
                                ],
                                {cancelable: false}
                            );
                        }
                    } else {
                        postcodeUpdate()
                        Alert.alert(
                            "Success",
                            "Postcode Updated",
                            [
                                {text: "OK", onPress: () => console.log("OK Pressed")}
                            ],
                            {cancelable: false}
                        );
                    }
                });
        } else {
            Alert.alert(
                "Error",
                "Invalid Postcode",
                [
                    {text: "OK", onPress: () => console.log("OK Pressed")}
                ],
                {cancelable: false}
            );
        }
    }
}


function valid_postcode(postcode) {

    // Check if the postcode is valid
    if (postcode) {
        postcode = postcode.replace(/\s/g, "");
        var regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
        return regex.test(postcode);
    } else {
        return false
    }
}


function toggleNotification(ID, state) {
    console.log("Notification Switch ID:", ID, "set to:", state);
    //currently, ID:
    //'1' is Bill Status
    //'2' is Local MP Votes
    //state is true/false

}

function logButtonPress(button) {
    console.log("User Pressed Button:", button);
}
