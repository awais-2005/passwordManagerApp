import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import PasswordDetailScreen from './src/screens/PasswordDetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import UpdatePasswordScreen from './src/screens/UpdatePasswordScreen';
import AddPasswordScreen from './src/screens/AddPasswordScreen';
import EncryptedStorage from 'react-native-encrypted-storage';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

// const testList = [
//         {
//             id: '1',
//             name: 'Facebook',
//             url: 'www.facebook.com',
//             username: 'james.smith@mail.gg',
//             password: 'Fb@12345',
//             dateAdded: '25 May 2022',
//             isCompromised: false,
//             icon: 'logo-facebook',
//             iconBg: '#4267B2',
//         },
//         {
//             id: '2',
//             name: 'Amazon',
//             url: 'www.amazon.com',
//             username: 'james.smith@mail.gg',
//             password: 'Amz@2022',
//             dateAdded: '10 Jun 2022',
//             isCompromised: false,
//             icon: 'logo-amazon',
//             iconBg: '#FF9900',
//         },
//         {
//             id: '3',
//             name: 'Apple',
//             url: 'www.apple.com',
//             username: 'james.smith@mail.gg',
//             password: 'Apple@123',
//             dateAdded: '15 Jul 2022',
//             isCompromised: false,
//             icon: 'logo-apple',
//             iconBg: '#555555',
//         },
//         {
//             id: '4',
//             name: 'Netflix',
//             url: 'www.netflix.com',
//             username: 'james.smith@mail.gg',
//             password: 'Net@flix22',
//             dateAdded: '20 Aug 2022',
//             isCompromised: false,
//             icon: 'logo-netflix',
//             iconBg: '#E50914',
//         },
//         {
//             id: '5',
//             name: 'Google',
//             url: 'www.google.com',
//             username: 'james.smith@mail.gg',
//             password: 'Goo@gle123',
//             dateAdded: '05 Sep 2022',
//             isCompromised: false,
//             icon: 'logo-google',
//             iconBg: '#4285F4',
//         },
//     ];

const App = () => {
    const [passwords, setPasswords] = useState([]);

    const [showHomeScreen, setShowHomeScreen] = useState(false);
    const [user, setUser] = useState({});
    const [showPasswordDetails, setShowPasswordDetails] = useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const [showAddPassword, setShowAddPassword] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showSignup, setShowSignup] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [displayedPassword, setDisplayedPassword] = useState({});


    useEffect(() => {
        checkSignUp();
        fetchPassword();
    }, []);

    useEffect(() => {
        let signedUp = !isObjEmpty(user);
        setShowLogin(signedUp);
        setShowSignup(!signedUp);
    }, [user]);

    const checkSignUp = async () => {
        EncryptedStorage.getItem('userOfPasswordManager').then((data) => {
            setUser(data ? JSON.parse(data) : {});
        }).catch((error) => {
            Alert.alert('Failed', 'Failed to get user', error);
        });
    };

    const saveUser = async (userDetails) => {
        EncryptedStorage.setItem('userOfPasswordManager', JSON.stringify(userDetails)).then(() => {
            Alert.alert('Success', 'Account has been created successfully. Always remember your birthplace which you entered ' + userDetails.answer);
            setUser(userDetails);
        }).catch((err) => {
            Alert.alert('Failed', 'Could not create an account' + err);
        });
    };

    const fetchPassword = async () => {
        EncryptedStorage.getItem('passwords').then((data) => {
            setPasswords(data ? JSON.parse(data) : []);
        }).catch((err) => {
            Alert.alert('Failed', 'Couldnt fetch passwords from storage ERR: ', err);
        });
    };

    const deletePassword = async (pwd, desScr, crrScr) => {
        if (passwords && passwords.length > 0 && pwd) {
            try {
                for (let i = 0; i <= passwords.length; i++) {
                    if (passwords[i].id === pwd.id) {
                        passwords.splice(i, 1);
                        break;
                    }
                }
            } catch (error) {
                Alert.alert('Error', 'Something went wrong!');
                return;
            }
            await EncryptedStorage.setItem('passwords', JSON.stringify(passwords)).then(() => {
                Alert.alert('Success', 'The password has been deleted.', [{
                    text: 'Ok',
                    style: 'default',
                    onPress: () => { crrScr(false); desScr(true); },
                }]);
            }).catch(() => {
                Alert.alert('Failed', 'Could not delete password.');
            });
        } else {
            Alert.alert('Failed', 'Could not delete password.');
        }
    };

    const saveChanges = async (pwd, desScr, crrScr) => {
        if (passwords && passwords.length > 0 && pwd) {
            try {
                for (let i = 0; i <= passwords.length; i++) {
                    if (passwords[i].id === pwd.id) {
                        passwords[i] = pwd;
                        break;
                    }
                }
            } catch (error) {
                Alert.alert('Error', error);
                return false;
            }
            EncryptedStorage.setItem('passwords', JSON.stringify(passwords)).then(() => {
                Alert.alert('Success', 'The password has been saved.', [{
                    text: 'Ok',
                    style: 'default',
                    onPress: () => { crrScr(false); desScr(true); },
                }]);
                return true;
            }).catch(() => {
                Alert.alert('Failed', 'Could not save changes.');
                return false;
            });
        } else {
            Alert.alert('Failed', 'Could not save changes.');
            return false;
        }
    };

    const addNewPassword = async (pwd, desScr, crrScr) => {

        if (pwd && passwords) {

            let temp = [];
            temp = passwords.reverse();
            temp.push(pwd);
            setPasswords(temp.reverse());

            EncryptedStorage.setItem('passwords', JSON.stringify(passwords)).then(() => {
                Alert.alert('Success', 'The password has been saved.', [{
                    text: 'Ok',
                    style: 'default',
                    onPress: () => { crrScr(false); desScr(true); },
                }]);
            }).catch((error) => {
                Alert.alert('Failed', 'Could not save password.', error);
            });
        } else {
            Alert.alert('Failed', 'Could not save password.');
        }
    };

    const deleteAccount = async () => {
        EncryptedStorage.removeItem('userOfPasswordManager').then(() => {
            Alert.alert('Success', 'Your Account has been deleted.');
            setShowProfile(false);
            setUser({});
        }).catch((err) => {
            Alert.alert('Failed', 'Could not delete your account.', err);
        });
    };

    return (
        <View style={styles.container}>

            {showHomeScreen && (<HomeScreen
                passwords={passwords || []}
                setDisplayedPassword={setDisplayedPassword}
                setShowHomeScreen={setShowHomeScreen}
                setShowProfile={setShowProfile}
                setShowPasswordDetails={setShowPasswordDetails}
                setShowAddPassword={setShowAddPassword}
            />)}

            {showPasswordDetails && (<PasswordDetailScreen
                password={displayedPassword}
                setShowHomeScreen={setShowHomeScreen}
                setShowPasswordDetails={setShowPasswordDetails}
                setShowUpdatePassword={setShowUpdatePassword}
                deletePassword={deletePassword}
            />)}

            {showUpdatePassword && (<UpdatePasswordScreen
                setDisplayedPassword={setDisplayedPassword}
                password={displayedPassword}
                setShowPasswordDetails={setShowPasswordDetails}
                setShowUpdatePassword={setShowUpdatePassword}
                saveChanges={saveChanges}
            />)}

            {showAddPassword && (<AddPasswordScreen
                passID={passwords ? passwords.length + 1 : 1}
                setShowHomeScreen={setShowHomeScreen}
                setShowAddPassword={setShowAddPassword}
                addNewPassword={addNewPassword}
            />)}

            {showProfile && (<ProfileScreen
                setShowHomeScreen={setShowHomeScreen}
                setShowProfile={setShowProfile}
                setShowAddPassword={setShowAddPassword}
                user={user}
                deleteAccount={deleteAccount}
            />)}

            {showLogin && (<LoginScreen
                setShowHomeScreen={setShowHomeScreen}
                setShowLogin={setShowLogin}
                user={{pin: user.pin + ''}}
            />)}

            {showSignup && (<SignupScreen
                saveUser={saveUser}
            />)}
        </View>
    );
};

export function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export default App;
