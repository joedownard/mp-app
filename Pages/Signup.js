import {View, SafeAreaView, TextInput, Button, Alert} from "react-native";
import React, {useState} from "react";
import {styles} from './Stylesheets/SignupStyles.js';
import AuthContext from "../components/AuthContext";

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
                                "\nTERMS AND CONDITIONS: \n" +
                                "1. You agree to processing by Group 10 University of Bath Integrated Projects Group of the data you enter using the Insight App. How we store your data is detailed in paragraph 2. Data that is entered that you agree to be processed includes:\n" +
                                "the legislation that you add to your favourites, for the purposes of\n" +
                                "providing to the user a list of legislation items they have added to their favourites\n" +
                                "the legislation that you add to your “likes”, for the purposes of\n" +
                                "modifying the value of a publicly visible \"like\" counter\n" +
                                "the legislation that you add to your “dislikes”, for the purposes of\n" +
                                "modifying the value of a publicly visible \"like\" counter\n" +
                                "your email address, for the purposes of\n" +
                                "account verification\n" +
                                "your postcode, for the purposes of\n" +
                                "transfer to our server for generation of a corresponding constituency\n" +
                                "storage of the generated constituency and use of it to determine the user's local MP\n" +
                                "any message you enter in the MP Message Page of the Insight App, for the purposes of\n" +
                                "sending the message on your behalf to the selected MP" +
                                "\n" +
                                "\n2. Any data you enter will not be transferred to additional third parties outside of our system as described here. Any data you enter will be stored in a secure database provided by Alphabet Inc.\n" +
                                "\n" +
                                "\n" +
                                "3. You agree to not abuse the service provided by Insight Ltd., you agree to:\n" +
                                "not attempt to create multiple accounts\n" +
                                "not attempt to send “spam” through the message MP function provided by Insight Ltd.\n",
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
