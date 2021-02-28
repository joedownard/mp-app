import {Button, SafeAreaView, Text, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {styles} from './Stylesheets/LoginStyles.js';

export default function Login({ navigation }) {
    const [emailAddress, setEmailAddress] = useState("Email Address")
    const [password, setPassword] = useState("Password")
    const [showPassword, setShowPassword] = useState(false)


    return (
        <SafeAreaView style={{flex: 1}}>

        <View style={styles.loginContainer}>
            <TextInput style={styles.textInput} value={emailAddress} onChangeText={text => setEmailAddress(text)}
                           onFocus={_ => {
                               if (emailAddress === "Email Address") setEmailAddress("")
                           }}/>
            <TextInput style={styles.textInput} secureTextEntry={showPassword} value={password}
                           onChangeText={text => {
                               setPassword(text)
                           }}
                           onFocus={_ => {
                               if (password === "Password") {
                                   setPassword("")
                               }
                               setShowPassword(true)
                           }
                           }
                />

                <View style={styles.loginButtonContainer}>
                    <Button
                        color='#4d4d4d'
                        onPress={() => console.log("login attempt")}
                        title="Login"
                    />
                </View>

                <View style={styles.signupButtonContainer}>
                    <Button
                        color='#4d4d4d'
                        onPress={() => navigation.navigate("Signup")}
                        title="Switch To Signup"
                    />
                </View>
            </View>

        </SafeAreaView>
    );
}

function submitLogin() {

}

function switchToSignup(navigation) {
    navigation.navigate("Signup")
}
