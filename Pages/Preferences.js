import {Text, View, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import React from "react";
import {styles} from './Stylesheets/PreferencesStyles.js';
import {RadioButton} from 'react-native-paper';

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

    const NotificationButton = () => {
        const [checked, setChecked] = React.useState('first');

        return (
            <View>
                <RadioButton
                    value="first"
                    status={ checked === 'first' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('first')}
                />
                <RadioButton
                    value="second"
                    status={ checked === 'second' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('second')}
                />
            </View>
        );
    };

    return (
    <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.preferencesText}>Preferences</Text>
        <View style={styles.pageTitleLine}/>
        <Text style={styles.postcodeText}>PostCode</Text>
        <PostCodeInput/>
        <PostCodeButton/>
        <Text style={styles.notificationText}>Notifications</Text>
        <View>
            
            <Text style={styles.billStatusText}>Bill Status</Text>
            
        </View>
        <Text style={styles.localMPText}>Local MP Votes</Text>
        
    </SafeAreaView>
    );
}

function updatePostcode() {
    console.log("User pressed 'Update PostCode' Button")
    //read postcode textbox
    //If user uncapitalises keyboard, next letter will not be capital
    //So ensure text read is converted using .ToUpperCase()
}

function switchUser() {
    //open log in page
}

function logOut() {
    //pretty self-explanatory
}
