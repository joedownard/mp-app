import {Text, View, SafeAreaView, TextInput, TouchableOpacity, Switch} from "react-native";
import React, {useState} from "react";
import {styles} from './Stylesheets/PreferencesStyles.js';

export default function Preferences() {

    const PostCodeInput = () => {
        const [value, onChangeText] = React.useState();

        return (
            <TextInput
                style={styles.postcodeTextBox}
                placeholder="PostCode"
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = 'PostCode'}
                autoCapitalize="characters"
                onChangeText={text => onChangeText(text)}
                value={value}
                autoCompleteType="postal-code"
                maxLength={8}
            />
        );
    }
    const PostCodeButton = () => {

        return (
            <TouchableOpacity 
                style={styles.updatePostcode}
                onPress={updatePostcode}>
                <Text style={styles.postCodeButtonText}>
                    Update PostCode
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
                trackColor={{ false: "#767577", true: "#37f71e" }}
                thumbColor={"#f4f3f4"}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        );
    }

    return (
    <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.preferencesText}>Preferences</Text>
        <View style={styles.pageTitleLine}/>
        <Text style={styles.postcodeText}>PostCode</Text>
        <PostCodeInput/>
        <PostCodeButton/>
        <Text style={styles.notificationText}>Notifications</Text>
        <NotificationSwitch styleSwitch={styles.billStatusSwitch} ID='1'/>
        <Text style={styles.billStatusText}>Bill Status</Text>
        <NotificationSwitch styleSwitch={styles.localMPSwitch} ID='2'/>
        <Text style={styles.localMPText}>Local MP Votes</Text>
        
    </SafeAreaView>
    );
}

function updatePostcode() {
    console.log("User pressed 'Update PostCode' Button");
    //read postcode textbox
    //If user uncapitalises keyboard, next letter will not be capital
    //So ensure text read is converted using .ToUpperCase()
}

function logOut() {
    console.log("User pressed 'Log Out' Button");
    //pretty self-explanatory
}

function switchUser() {
    console.log("User pressed 'Switch Users' Button");
    //open log in page
}

function toggleNotification(ID, state) {
    console.log("Notification switch ID:", ID, "set to:", state);

}
