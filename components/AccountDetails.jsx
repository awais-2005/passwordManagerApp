import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { deleteAccount, updateChange } from '../App';
import { images } from './AccountCard';

export default function AccountDetails(props) {
    const [eye, setEye] = useState('eye-off-outline');
    const [copyUsername, setCopyUsername] = useState('copy-outline');
    const [copyPassword, setCopyPassword] = useState('copy-outline');
    const [logo, setLogo] = useState('default');
    const [user, setUser] = useState(props.displayedAccount.username);
    const [pass, setPass] = useState(props.displayedAccount.password);
    const [showPassword, setShowPassword] = useState(false);
    const [textOfAction, setTextOfAction] = useState('Edit');
    const [editable, setEditable] = useState(false);
    const [displayCopy, setDisplayCopy] = useState('flex');
    const [fieldTextColor, setFieldTextColor] = useState('grey');

    useEffect(() => {
        const name = props.displayedAccount.accountName.toLowerCase();
        if (name.includes('google')) { setLogo('google'); }
        else if (name.includes('facebook')) { setLogo('facebook'); }
        else if (name.includes('fiver')) { setLogo('fiverr'); }
        else if (name.includes('gmail')) { setLogo('gmail'); }
        else if (name.includes('linkedin')) { setLogo('linkedIn'); }
        else if (name.includes('twitter')) { setLogo('twitter'); }
        else if (name.includes('insta')) { setLogo('instagram'); }
        else if (name.includes('prime')) { setLogo('PrimeVideo'); }
        else if (name.includes('netflix')) { setLogo('netflix'); }
    }, [props.displayedAccount.accountName]);

    return (
        <View style={styles.main}>
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navButtons} onPress={() => {
                    props.setShowHome(true);
                    props.setShowAccount(false);
                }}>
                    <Icon name="arrow-back-outline" size={27} color="grey" />
                </TouchableOpacity>
                <Text style={styles.title}>Account Details</Text>
            </View>
            <Image source={images[logo]} style={styles.logo} />
            <Text style={styles.logoText}>{props.displayedAccount.accountName}</Text>
            <View style={styles.fieldContainer}>
                <Icon name="mail-outline" color="grey" size={25} />
                <TextInput style={[styles.textField, { color: fieldTextColor }]} value={((user.length < 20) && (user)) || (user.slice(0, 20) + '...')} onChangeText={setUser} editable={editable} />
                <View style={styles.actions}>
                    <TouchableOpacity style={{ display: displayCopy }} onPress={() => {
                        setCopyUsername('checkbox-outline');
                        setCopyPassword('copy-outline');
                        Clipboard.setString(props.displayedAccount.username);
                    }}>
                        <Icon name={copyUsername} color="grey" size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.fieldContainer}>
                <Icon name="key-outline" color="grey" size={25} />
                <TextInput style={[styles.textField, { color: fieldTextColor }]} value={pass} onChangeText={setPass} secureTextEntry={!showPassword} editable={editable} />
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
                    <TouchableOpacity style={{ display: displayCopy }} onPress={() => {
                        setCopyPassword('checkbox-outline');
                        setCopyUsername('copy-outline');
                        Clipboard.setString(props.displayedAccount.password);
                    }}>
                        <Icon name={copyPassword} color="grey" size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.mainActions}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    if (textOfAction === 'Edit') {
                        setEditable(true);
                        setTextOfAction('Save');
                        setDisplayCopy('none');
                        setFieldTextColor('#000');
                    } else if (textOfAction === 'Save') {
                        setEditable(false);
                        setTextOfAction('Edit');
                        setDisplayCopy('flex');
                        setFieldTextColor('grey');
                        updateChange({
                            id: props.displayedAccount.id,
                            accountName: props.displayedAccount.accountName,
                            username: user,
                            password: pass,
                        });
                    }
                }}>
                    <Text style={styles.buttonText}>{textOfAction}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor: 'red', borderColor: 'red'}]} onPress={() => {
                    deleteAccount(props.displayedAccount);
                    props.setShowHome(true);
                    props.setShowAccount(false);
                }}>
                    <Text style={[styles.buttonText, {color: '#fff'}]}>Delete</Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
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
        position: 'absolute',
        top: 0,
        left: 0,
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
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textField: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
    },
    actions: {
        flexDirection: 'row',
        gap: 15,
    },
    mainActions: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    button: {
        height: 50,
        width: '49%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'grey',
        fontSize: 19.5,
        fontWeight: 'bold',
    },
});
