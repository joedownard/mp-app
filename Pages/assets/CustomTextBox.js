import React from "react";
import { TextInput } from "react-native";

export default class CustomTextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textBoxValue: ''
        }
        this.buttonName=props.buttonName;
        this.handleClickFunction=props.handleFunction;
        this.style=props.style;
        console.log(this.style);
    }

    handleButtonClick = () => {
        console.log(this.state.textBoxValue);
        this.handleClickFunction(this.buttonName);
    }
    
    handleChange = (e) => {
        this.setState({
            textBoxValue: e.target.value
        })
    }
    
    render() {
        return(
            <TextInput
                style={this.style}
                name={this.buttonName}
                onChange={e => this.handleChange(e)}
            />
        )
    }
}
