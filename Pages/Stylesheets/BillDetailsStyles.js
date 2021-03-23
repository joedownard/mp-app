import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    pageTitleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    backButton: {
        width: 12,
        height: 21,
        marginTop: 8,
        marginLeft: 15,
    },

    favouriteButton: {
        width: 25,
        height: 25,
        marginTop: 5,
        marginLeft: 5,
    },

    link: {
        marginTop: 20,
        color: '#5099de',
        fontSize: 28,
        textAlign: "center"
    },

    pageTitle: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: '900',
        marginLeft: 30,
        marginTop: 20,
    },

    shareButton: {
        width: 35,
        height: 35,
        marginRight: 15,
    },

    horizontalLine: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginTop: 5,
    },


    billDescriptionSection: {
        marginTop: 30,
        margin: 10,
    },

    billDescriptionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    billDescriptionTitleText: {
        fontSize: 22,
        fontWeight: '700',
    },

    billDescriptionDateText: {
        marginRight: 5,
        marginTop: 4,
        fontSize: 18,
    },

    billDescriptionText: {
        fontSize: 18,
    },

    billStatusSection: {
        marginTop: 30,
        margin: 10,
    },

    billStatusTitleText: {
        fontSize: 22,
        fontWeight: '700',
    },

    messageMPSection: {
        marginTop: 30,
        margin: 10,
    },

    billReactionSection: {
        margin: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    largeThumbsUp: {
        width:100,
        height:100,
    },

    likesText: {
        marginTop: 5,
        textAlign: 'center',
    },

    largeThumbsDown: {
        width:100,
        height:100,
    },

    dislikesText: {
        marginTop: 5,
        textAlign: 'center',
    },

    loadingDataText: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: '900',
        marginTop: 10,
    }

});
