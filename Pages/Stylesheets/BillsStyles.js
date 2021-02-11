import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    billContainer : {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '3%',
        padding: 5,
        backgroundColor: '#C4C4C4',
    },

    billHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    billHeaderFavouriteDate: {
        flexDirection: 'row',
    },

    favouriteButton: {
        marginRight: 5,
        width: 25,
        height: 25,
    },

    dateText: {
        marginRight: 5,
        marginTop: 3,
    },

    billTitle: {
        fontSize: 24,
        fontWeight: '900',
    },

    horizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginLeft: 5,
        marginRight: 5,
    },

    billDescription: {
        marginTop: 10,
        marginLeft: 6,
        fontSize: 14,
    },

    billFooter: {
        marginTop: 10,
        marginLeft: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    likesContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    thumbsUp: {
        width: 35,
        height: 35,
    },

    thumbsUpNumber: {
        marginTop: 10,
        marginLeft: 10,
    },

    dislikesContainer: {
        flex: 1,
        flexDirection: 'row',
    },


    thumbsDown: {
        width: 35,
        height: 35,
    },

    thumbsDownNumber: {
        marginTop: 10,
        marginLeft: 10,
    },

    sharesContainer: {
        marginRight: 10,
        flex: 1,
        flexDirection: 'row-reverse',
    },

    shareButton: {
        width: 35,
        height: 35,
    },

    shareNumber: {
        marginTop: 10,
        marginLeft: 10,
    }


});
