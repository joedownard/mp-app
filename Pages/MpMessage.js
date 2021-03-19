import React from "react";
import {Text, View, Image, SafeAreaView, Button, TextInput, KeyboardAvoidingView, Platform} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import {styles} from './Stylesheets/MpMessageStyles.js';



export default function MpMessage({ route, navigation }) {

    const mpData = route.params;

    const [messageValue, onChangeText] = React.useState();

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={{ flex: 1 }}>
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

                <Button style={styles.votingHistoryButton}
                    color='#4d4d4d'
                    onPress={() => {}}
                    title="Voting History"/>
            </View>
            <View style={{flex: 1, padding: "2%"}}>
                <DropDownPicker
                    items={[
                        {label: 'Pre-made Formats', value: 'pre-made'}
                    ]}
                    containerStyle={{height: 40, width: "98%"}}
                    style={styles.dropDownBox}
                    defaultValue={'pre-made'}/>
            </View>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}>
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
                        onPress={() => {}}
                        title="Message"/>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}