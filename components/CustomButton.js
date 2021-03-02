import {Text, TouchableOpacity} from "react-native";

export default function CustomButton(buttonText, onClickFunction, buttonTextStyle, style) {
    
    return (
        <TouchableOpacity
            style={style}
            onPress={console.log("yhyhyh")}>
            <Text style={buttonTextStyle}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
}