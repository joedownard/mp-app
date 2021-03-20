import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    mpInfoSection: {
        margin: '2%',
        padding: '1%',
        backgroundColor: '#C4C4C4',
    },

    textSection: {

    },

    mpName: {
        fontWeight: '900',
        fontSize: 24,
    },

    mpConstituency: {
        fontSize: 18,
        color: 'grey'
    },

    contactDetailsTitle: {
        fontWeight: '900',
        fontSize: 24,
        marginTop: 10,
    },

    mpPhoneNumber: {
        color: 'grey',
        fontSize: 16,
    },

    mpEmailAddress: {
        marginBottom: 10,
        fontSize: 16,
        color: 'grey',
    },

    mpPicture: {
        left: -55,
        top: 5,
        width: 100,
        height: 100,
    },

    votingHistoryButton: {
        backgroundColor: '#C4C4C4',
    },

    dropDownContainer: {
        flex: 1,
        padding: "1%",
        height: 40, 
        width: "50%", //98
        alignSelf: "flex-end",
        zIndex: 100,
    },

    dropDownBox: {
        
        borderWidth: 2,
        borderColor: '#C4C4C4',
    },

    messageBox: {
        height: "80%",
        width: "96%",
        marginLeft: "2%",
        backgroundColor: "white",
        textAlignVertical: "top",
    },

    messageButton: {

    },

    bottomButton: {
        position: "absolute",
        bottom: 0,
        width: "96%",
        marginLeft: "2%",
        marginTop: "2%",
    }
});