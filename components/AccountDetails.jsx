import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AccountDetails(props) {
    const [eye, setEye] = useState('eye-off-outline');
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={styles.main}>
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navButtons} onPress={() => {
                    props.setShowHome(true);
                    props.setShowAccount(false);
                }}>
                    <Icon name="arrow-back-outline" size={30} color="grey" />
                </TouchableOpacity>
                <Text style={styles.title}>Account Details</Text>
                <TouchableOpacity style={styles.navButtons}>
                    <Icon name="ellipsis-vertical" size={25} color="grey" />
                </TouchableOpacity>
            </View>
            <View style={styles.logo}/>
            <Text style={styles.logoText}>{props.displayedAccount.accountName}</Text>
            <View style={styles.fieldContainer}>
                <Icon name="mail-outline" color="grey" size={25}/>
                <TextInput style={styles.textField} value={props.displayedAccount.username} editable={false} />
                <View style={styles.actions}>
                    <TouchableOpacity>
                        <Icon name="copy-outline" color="grey" size={25}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.fieldContainer}>
                <Icon name="key-outline" color="grey" size={25}/>
                <TextInput style={styles.textField} value={props.displayedAccount.password} secureTextEntry={!showPassword} editable={false}/>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => {
                        if (!showPassword) {
                            setShowPassword(true);
                            setEye('eye-outline');
                        } else {
                            setShowPassword(false);
                            setEye('eye-off-outline');
                        }
                        }}>
                        <Icon name={eye} color="grey" size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="copy-outline" color="grey" size={25}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    navBar: {
        flexDirection: 'row',
        height: 70,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
    navButtons: {
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: '#4e99dfff',
        marginTop: 50,
    },
    logoText: {
        marginTop: 10,
        marginBottom: 25,
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
    },
    fieldContainer: {
        marginTop: 10,
        height: 50,
        width: '90%',
        borderWidth: 0.3,
        borderRadius: 8,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textField: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        color: '#3c3c3c',
    },
    actions: {
        flexDirection: 'row',
        gap: 15,
    },
});
