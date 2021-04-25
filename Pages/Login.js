import {Button, KeyboardAvoidingView, Platform, SafeAreaView, TextInput, View} from "react-native";
import React, {useState} from "react";
import {styles} from './Stylesheets/LoginStyles.js';

import AuthContext from '../components/AuthContext.js';


export default function Login({ route, navigation }) {
    const [emailAddress, setEmailAddress] = useState("Email Address")
    const [password, setPassword] = useState("Password")
    const [showPassword, setShowPassword] = useState(false)
    const [loggingIn, setLoggingIn] = useState(false);

    const { signIn } = React.useContext(AuthContext);

    function handleLogin () {
        signIn({"emailAddress": emailAddress, "password":password})
        setLoggingIn(true)
        setTimeout(() => {
            setLoggingIn(false)
        }, 2000)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >

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

                <View style={loggingIn === true ? styles.loginButtonContainerActive : styles.loginButtonContainer}>
                    <Button
                        color={loggingIn === true ? '#c4c4c4' : '#4d4d4d'}
                        onPress={handleLogin}
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

        </KeyboardAvoidingView>
    );
}

function switchToSignup(navigation) {
    navigation.navigate("Signup")
}
