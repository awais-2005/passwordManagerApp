import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { appendAccountList } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';

function AddNewAccountPopup(props) {
    const [accountName, setAccountName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.popup}>
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navButtons} onPress={() => {
                    props.setShowHome(true);
                    props.setShowAddPopup(false);
                }}>
                    <Icon name="arrow-back-outline" size={27} color="grey" />
                </TouchableOpacity>
                <Text style={styles.title}>Add New Account</Text>
            </View>
            <ScrollView style={styles.main}>
                <Text style={styles.inputLabel}>Enter platform name:</Text>
                <TextInput style={styles.textInput} placeholder="e.g. Google, Instagram, Facebook" placeholderTextColor="grey" onChangeText={setAccountName} value={accountName} />
                <Text style={styles.inputLabel}>Enter email, Phone No. or Username:</Text>
                <TextInput style={styles.textInput} placeholder="e.g. example@gmail.com" placeholderTextColor="grey" onChangeText={setUsername} value={username} />
                <Text style={styles.inputLabel}>Enter password:</Text>
                <TextInput style={styles.textInput} placeholder="Password" placeholderTextColor="grey" onChangeText={setPassword} value={password} secureTextEntry={true} />
            </ScrollView>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttons} onPress={() => {
                    if (accountName && username && password) {
                        let logoName = 'default';
                        if (accountName.toLowerCase().includes('google')) {
                            logoName = 'google';
                        } else if (accountName.toLowerCase().includes('facebook')) {
                            logoName = 'facebook';
                        } else if (accountName.toLowerCase().includes('fiver')) {
                            logoName = 'fiverr';
                        } else if (accountName.toLowerCase().includes('gmail')) {
                            logoName = 'gmail';
                        } else if (accountName.toLowerCase().includes('linkedin')) {
                            logoName = 'linkedIn';
                        } else if (accountName.toLowerCase().includes('twitter')) {
                            logoName = 'twitter';
                        } else if (accountName.toLowerCase().includes('insta')) {
                            logoName = 'instagram';
                        } else if (accountName.toLowerCase().includes('prime')) {
                            logoName = 'PrimeVideo';
                        } else if (accountName.toLowerCase().includes('netflix')) {
                            logoName = 'netflix';
                        }
                        appendAccountList(
                            props.accountsList,
                            {
                                id: props.accountsList.length + 1,
                                accountName: accountName,
                                username: username,
                                password: password,
                                logo: logoName,
                            },
                            props.setShowErr,
                            props.setErr,
                            props.setShowHome
                        );
                        props.setShowHome(true);
                        props.setShowAddPopup(false);
                    }
                }}>
                    <Text style={styles.buttonsText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    popup: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    navBar: {
        flexDirection: 'row',
        height: 70,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        color: '#000',
        fontWeight: 'bold',
    },
    navButtons: {
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    main: {
        maxHeight: 310,
        paddingHorizontal: 15,
        marginHorizontal: 20,
        // backgroundColor: '#dadffcff',
        borderRadius: 10,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#000',
    },
    textInput: {
        height: 50,
        borderColor: '#ccc',
        color: '#3c3c3c',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    actions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
        marginTop: 10,
    },
    buttons: {
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        borderWidth: 2,
    },
    buttonsText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default AddNewAccountPopup;
