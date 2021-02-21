import {Text, View, SafeAreaView, TextInput, TouchableOpacity, Switch} from "react-native";
import React, {useState} from "react";
import {styles} from './Stylesheets/PreferencesStyles.js';
import CustomTextBox from './assets/CustomTextBox.js';
import CustomButton from './assets/CustomButton.js';

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
                style={[styles.button, styles.updatePostcodeButton]}
                onPress={updatePostcode}>
                <Text style={styles.buttonText}>
                    Update PostCode
                </Text>
            </TouchableOpacity>
        );
    }

    const LogOutButton = () => {

        return(
            <TouchableOpacity
                style={[styles.button, styles.logOutButton]}
                onPress={logOut}>
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
                onPress={switchUser}>
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
        <LogOutButton/>
        <SwitchUsersButton/>
        
        {/* next step, create custom button, which can accept custom text box as prop 
            so that, button press will get textbox value
        */}
        <CustomTextBox buttonName="testing"
            handleFunction={logButtonPress}
            style={{
                marginLeft: 200,
                marginTop: 50,
                height: 25,
                width: 90,
                textAlign: 'center',
                backgroundColor: 'rgb(196, 196, 196)',
            }}
        />
    </SafeAreaView>
    );
}

function updatePostcode() {
    logButtonPress("Update PostCode");
    //read postcode textbox
    //If user uncapitalises keyboard, next letter will not be capital
    //So ensure text read is converted using .ToUpperCase()

}

function logOut() {
    logButtonPress("Log Out");
    //pretty self-explanatory
}

function switchUser() {
    logButtonPress("Switch Users");
    //open log in page
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
