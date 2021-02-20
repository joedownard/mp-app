import {Text, View, SafeAreaView, TextInput, Button} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {styles} from './Stylesheets/SignupStyles.js';

export default function Signup({ navigation }) {
    const [firstName, setFirstName] = useState("First Name")
    const [lastName, setLastName] = useState("Last Name")
    const [emailAddress, setEmailAddress] = useState("Email Address")
    const [postCode, setPostCode] = useState("Postcode")
    const [password, setPassword] = useState("Password")
    const [confirmPassword, setConfirmPassword] = useState("Confirm Password")
    const [showPassword, setShowPassword] = useState(false)


    return (
        <SafeAreaView style={{flex: 1}}>

            <View style={styles.signUpContainer}>
                <TextInput style={styles.textInput} value={firstName} onChangeText={text => setFirstName(text)}
                           onFocus={_ => {
                               if (firstName === "First Name") setFirstName("")
                           }}/>
                <TextInput style={styles.textInput} value={lastName} onChangeText={text => setLastName(text)}
                           onFocus={_ => {
                               if (lastName === "Last Name") setLastName("")
                           }}/>
                <TextInput style={styles.textInput} value={emailAddress} onChangeText={text => setEmailAddress(text)}
                           onFocus={_ => {
                               if (emailAddress === "Email Address") setEmailAddress("")
                           }}/>
                <TextInput style={styles.textInput} value={postCode} autoCapitalize="characters"
                           onChangeText={text => {
                               setPostCode(text.toString().toUpperCase())
                           }}
                           onFocus={_ => {
                               if (postCode === "Postcode") setPostCode("")
                           }}/>
                <TextInput style={styles.textInput} secureTextEntry={showPassword} value={password}
                           onChangeText={text => {
                               setPassword(text)
                           }}
                           onFocus={_ => {
                               if (password === "Password") {
                                   setConfirmPassword("")
                                   setPassword("")
                               }
                               setShowPassword(true)
                           }
                           }
                />
                <TextInput style={styles.textInput} secureTextEntry={showPassword} value={confirmPassword}
                           onChangeText={text => {
                               setConfirmPassword(text)
                           }}
                           onFocus={_ => {
                               if (confirmPassword === "Confirm Password") {
                                   setConfirmPassword("")
                                   setPassword("")
                               }
                               setShowPassword(true)
                           }
                           }
                />

                <View style={styles.signupButtonContainer}>
                <Button
                    color='#4d4d4d'
                    onPress={() => submitSignup()}
                    title="Signup"
                />
                </View>

                <View style={styles.loginButtonContainer}>
                <Button
                    color='#4d4d4d'
                    onPress={() => switchToLogin(navigation)}
                    title="Switch To Login"
                />
                </View>
            </View>

        </SafeAreaView>
    );
}

function submitSignup() {

}

function switchToLogin(navigation) {
    navigation.navigate("Login")
}
