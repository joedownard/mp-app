import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    updatePostcode: {
        marginTop: 10,
        marginLeft: 65,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(196, 196, 196)',
        width: 225,
        height: 30
    },

    postCodeButtonText: {
        fontSize: 16, 
        color: "rgb(112, 112, 112)"
    },

    postcodeTextBox: {
        marginLeft: 200,
        marginTop: -25,
        height: 25,
        width: 90,
        backgroundColor: 'rgb(196, 196, 196)',
    },

    postcodeText: {
        marginLeft: 65,
        marginTop: 60,
        fontSize: 19,
        fontWeight: '900',
    },

    notificationText: {
        marginLeft: 65,
        marginTop: 40,
        fontSize: 19,
        fontWeight: '900',
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
