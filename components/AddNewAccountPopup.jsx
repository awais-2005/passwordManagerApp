import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { appendAccountList, listOfAccounts } from '../App';

function AddNewAccountPopup(props) {
    const [accountName, setAccountName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.popup}>
            <Text style={styles.popupTitle}>Add New Account</Text>
            <Text style={styles.inputLabel}>Enter platform name:</Text>
            <TextInput style={styles.textInput} placeholder="e.g. Google, Instagram, Facebook" onChangeText={setAccountName} value={accountName}/>
            <Text style={styles.inputLabel}>Enter email, Phone No. or Username:</Text>
            <TextInput style={styles.textInput} placeholder="e.g. example@gmail.com" onChangeText={setUsername} value={username}/>
            <Text style={styles.inputLabel}>Enter password:</Text>
            <TextInput style={styles.textInput} placeholder="XXXXXX" onChangeText={setPassword} value={password}/>
            <TouchableOpacity style={styles.addButton} onPress={() => {
                if(accountName && username && password) {
                    appendAccountList(
                        {
                            id: listOfAccounts.length + 1,
                            accountName: accountName,
                            username: username,
                            password: password,
                        }
                    );
                    props.setShowAdd(true);
                    props.setShowAddPopup(false);
                }
            }}>
                <Text style={styles.addButtonText}>Add Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    popup: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#3c3c3c',
        padding: 20,
        position: 'absolute',
        top: '20%',
        left: '5%',
    },
    popupTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center',
        marginBottom: 5,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#000',
    },
    textInput: {
        height: 50,
        borderColor: '#000',
        borderWidth: 0.3,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddNewAccountPopup;
