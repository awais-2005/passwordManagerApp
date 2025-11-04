import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const images = {
    google: require('../assets/images/google.png'),
    facebook: require('../assets/images/facebook.png'),
    instagram: require('../assets/images/instagram.png'),
    gmail: require('../assets/images/gmail.png'),
    fiverr: require('../assets/images/fiverr.png'),
    linkedIn: require('../assets/images/linkedIn.png'),
    twitter: require('../assets/images/twitter.png'),
    netflix: require('../assets/images/netflix.png'),
    PrimeVideo: require('../assets/images/PrimeVideo.png'),
    default: require('../assets/images/default.png'),
};

function AccountCard(props) {

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => {
            props.setDisplayAcc(props.currentAccount);
            props.setShowHom(false);
            props.setShowAcc(true);
        }} >
            <Image source={images[props.currentAccount.logo]} style={styles.logo} />
            <View style={styles.cardTextContainer}>
                <Text style={styles.accountName}>{props.currentAccount.accountName}</Text>
                <Text style={styles.username}>{((props.currentAccount.username.length < 15) && (props.currentAccount.username)) || (props.currentAccount.username.slice(0, 15) + '...')}</Text>
            </View>
            <TouchableOpacity style={styles.copyIcon} onPress={() => { Clipboard.setString(props.currentAccount.password); }} >
                <Icon name="copy-outline" size={25} color="grey" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey',
        gap: 15,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    logo: {
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        borderWidth: 0.3,
        borderRadius: 10,
    },
    cardTextContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    accountName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333ff',
        marginBottom: 5,
    },
    username: {
        fontSize: 16,
        color: '#666666ff',
        maxHeight: 23,
    },
    copyIcon: {
        marginLeft: 10,
        height: 50,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AccountCard;
