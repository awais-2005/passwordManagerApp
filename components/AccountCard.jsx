import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function AccountCard(props) {
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => {
                    props.setDisplayedAccount(
                        {
                            accountName: props.accountName,
                            username: props.username,
                            password: props.password,
                        }
                    );
                    props.setShowHome(false);
                    props.setShowAccount(true);
                }} >
            <View style={styles.logo}/>
            <View style={styles.cardTextContainer}>
                <Text style={styles.accountName}>{props.accountName}</Text>
                <Text style={styles.username}>{props.username}</Text>
            </View>
            <TouchableOpacity style={styles.copyIcon}><Icon name="copy-outline" size={25} /></TouchableOpacity>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderWidth: 0.3,
        borderColor: '#000',
        gap: 15,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    logo: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 0.3,
        borderRadius: 25,
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
