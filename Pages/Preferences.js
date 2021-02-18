import {Text, View, SafeAreaView, TextInput} from "react-native";
import React from "react";
import {styles} from './Stylesheets/PreferencesStyles.js';
import render from "react-native-web/dist/cjs/exports/render";

export default function Preferences() {
    
    const PostCodeInput = () => {
        const [value, onChangeText] = React.useState();
        
        //If user uncapitalises keyboard, next letter will not be capital
        //So ensure text read is converted using .ToUpperCase()
        return (
            <TextInput
                style={styles.postcodeTextBox}
                textAlign={'center'}
                placeholder="PostCode"
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = 'PostCode'}
                autoCapitalize="characters"
                onChangeText={text => onChangeText(text)}
                value={value}
            />
        );
        //how will input be confirmed/submitted and handled
    }

    return (
    <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.pageTitle}>Preferences</Text>
        <View style={styles.pageTitleLine}/>
        <Text style={styles.postcodeText}>PostCode</Text>
        <Text style={styles.notificationsText}>Notifications</Text>
        <PostCodeInput/>
    </SafeAreaView>
    );
}
