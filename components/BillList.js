import {View} from "react-native";
import React, {useEffect, useState} from "react";
import AuthContext from "./AuthContext.js";
import {BillItem} from "./BillItem.js";

export function BillList(props) {
    const {userAuthenticationToken, email} = React.useContext(AuthContext);

    // Create a bill listing for every bill in the dataset
    const [data, setData] = useState(props.data)

    // Implement the searching functionality
    useEffect(() => {
        if (props.searchTerm !== "") {
            let tempData = []
            props.data.forEach((item) => {
                // Check each bill item to see if it contains the search term, if so include it in the bill list
                if (item.title.toUpperCase().includes(props.searchTerm.toUpperCase()) || item.short_desc.toUpperCase().includes(props.searchTerm.toUpperCase())) {
                    tempData.push(item)
                }
            })
            setData(tempData)
        } else {
            setData(props.data)
        }
    }, [props.data, props.searchTerm]);

    // Construct the bill list out of the bill elements
    const billItemList = data.map((item) =>
        <BillItem key={item.id} userAuthenticationToken={userAuthenticationToken} email={email} backPage={props.backPage}
                  navigation={props.navigation} id={item.id} name={item.title} date={item.date_added}
                  billDescription={item.short_desc} likes={item.likes} dislikes={item.dislikes} mpVote={item.voted} like_state={item.like_state}/>
    );

    return (
        <View style={{marginBottom: 10}}>
            {billItemList}
        </View>
    )
}

