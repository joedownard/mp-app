import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    mainContainer: {
      alignItems: 'center',
    },

    localMPSwitch: {
        alignSelf: 'flex-start',
    },

    billStatusSwitch: {
        alignSelf: 'flex-start',
    },

    billStatusText: {
        marginLeft: 120,
        fontSize: 16,
        alignSelf: 'flex-end',
    },

    localMPText: {
        marginLeft: 81,
        fontSize: 16,
        alignSelf: 'flex-end',
    },

    updatePostcodeButton: {
        marginTop: 10,
    },

    switchUserButton: {
        marginTop: 20,
    },

    logOutButton: {
        marginTop: 20,
    },

    buttonText: {
        fontSize: 16,
        color: "rgb(112, 112, 112)"
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(196, 196, 196)',
        width: 245,
        height: 30
    },

    postcodeTextBoxContainer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    postcodeTextBox: {
        height: 25,
        width: 90,
        marginLeft: 65,
        textAlign: 'center',
        backgroundColor: 'rgb(196, 196, 196)',
    },

    postcodeText: {
        fontSize: 19,
        fontWeight: '900',
    },

    notificationText: {
        marginTop: 35,
        fontSize: 19,
        fontWeight: '900',
    },

    switchContainer: {
        marginTop: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    preferencesText: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: '900',
    },

    pageTitleLine: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginTop: 5,
        marginLeft: 3,
        marginRight: 3,
    },
});
