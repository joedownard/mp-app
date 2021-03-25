import {View, SafeAreaView, TextInput, Button, Alert} from "react-native";
import React, {useState} from "react";
import {styles} from './Stylesheets/SignupStyles.js';
import AuthContext from "../components/AuthContext";

import terms_and_conditions from "../components/terms_and_conditions";

export default function Signup({navigation}) {
    const [firstName, setFirstName] = useState("First Name")
    const [lastName, setLastName] = useState("Last Name")
    const [emailAddress, setEmailAddress] = useState("Email Address")
    const [postCode, setPostCode] = useState("Postcode")
    const [password, setPassword] = useState("Password")
    const [confirmPassword, setConfirmPassword] = useState("Confirm Password")
    const [showPassword, setShowPassword] = useState(false)

    const {signUp} = React.useContext(AuthContext);

    return (
        <SafeAreaView style={{flex: 1, alignItems: "center"}}>

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
                        onPress={() => {
                            Alert.alert(
                                "You must agree to the Terms and Conditions",
                                terms_and_conditions(),
                                [
                                    {
                                        text: "Disagree",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    { text: "Agree", onPress: () => signUp({
                                            "firstName": firstName,
                                            "lastName": lastName,
                                            "emailAddress": emailAddress,
                                            "postcode": postCode,
                                            "password": password
                                        }) }
                                ],
                                { cancelable: false }
                            );

                        }}
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


function switchToLogin(navigation) {
    navigation.navigate("Login")
}
