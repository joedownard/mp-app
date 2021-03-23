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
        left: -10,
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
        paddingTop: 0,
        height: 100,
        width: "50%", //98
        alignSelf: "flex-end",
        fontSize: 18,
    },

    dropDownBox: {
        marginTop: 0,
        marginBottom: 0,
        height: 10,
        fontSize: 18,
    },

    messageBox: {
        marginTop: -400,
        height: 175,
        marginLeft: "2%",
        marginRight: "2%",
        backgroundColor: "white",
        textAlignVertical: "top",
    },

    buttonContainer: {
        backgroundColor: 'white'
    },

    messageButton: {

    },

    bottomButton: {
        backgroundColor: '#C4C4C4',
        position: "absolute",
        bottom: 0,
        width: "96%",
        marginLeft: "4%",
        marginRight: "14%",
        marginBottom: 235,
    }
});
