import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    pageTitleSection: {
    },

    pageTitle: {
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

    searchBar: {
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 2,
        height: 40,
        borderColor: '#C4C4C4',
    },

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
        marginRight: 10,
        marginTop: 2,
        width: 25,
        height: 25,
    },

    dateText: {
        marginRight: 5,
        marginTop: 4,
        fontSize: 16,
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

    mpVotedText: {
        marginTop: 10,
      marginRight: 15,
    },



    loadingDataText: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: '900',
        marginTop: 10,
    },
});
