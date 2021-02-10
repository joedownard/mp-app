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

    billHeaderRightSection: {
        margin: 5,
    },

    billTitle: {
        fontStyle: 'Garamond',
        fontSize: 24,
        fontWeight: 900,
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
        textIndent: -4,
        fontStyle: 'Garamond',
        fontSize: 14,
    }
});
