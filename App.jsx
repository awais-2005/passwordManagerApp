import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import AddButton from './components/AddButton';
import AddNewAccountPopup from './components/AddNewAccountPopup';
import AccountDetails from './components/AccountDetails';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function App() {
    const [listOfAccounts, setListOfAccounts] = useState([]);
    const [showHomeScreen, setShowHomeScreen] = useState(true);
    const [showAddAccountPopup, setShowAddAccountPopup] = useState(false);
    const [showAddButton, setShowAddButton] = useState(true);
    const [showAccountScreen, setShowAccountScreen] = useState(false);
    const [displayedAccount, setDisplayedAccount] = useState({});
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('No Error');

    EncryptedStorage.getItem('accounts')
        .then((data) => {
            setListOfAccounts(data ? JSON.parse(data) : []);
            setAllAccounts(listOfAccounts);
        })
        .catch(() => {
            setError('Could not read accounts from storage.');
            setShowHomeScreen(false);
            setShowError(true);
        });
    return (
        <View>
            {showHomeScreen && (
                <View style={styles.main}>
                    <Navbar />
                    <SearchBar accountList={listOfAccounts} setDisplayAccount={setDisplayedAccount} setShowAccount={setShowAccountScreen} setShowHome={setShowHomeScreen} />
                    {showAddButton && <AddButton setShowAddPopup={setShowAddAccountPopup} setShowHome={setShowHomeScreen} />}
                </View>
            )}
            {showAccountScreen && (
                <AccountDetails
                    setShowHome={setShowHomeScreen}
                    displayedAccount={displayedAccount}
                    setShowAccount={setShowAccountScreen}
                />
            )}
            {showAddAccountPopup && (
                <AddNewAccountPopup
                    accountsList={listOfAccounts}
                    setErr={setError}
                    setShowErr={setShowError}
                    setShowHome={setShowHomeScreen}
                    showAddPopup={showAddAccountPopup}
                    setShowAddPopup={setShowAddAccountPopup}
                    showAdd={showAddButton}
                    setShowAdd={setShowAddButton}
                />)}
            {showError && (
                <View>
                    <Text>{error}</Text>
                </View>
            )}
        </View>
    );
}
let allAccounts = [];
function setAllAccounts(allAcc) {
    allAccounts = allAcc;
}
export function updateChange(updatedAccount) {
    for (let account of allAccounts) {
        if (account.id === updatedAccount.id) {
            account.username = updatedAccount.username;
            account.password = updatedAccount.password;
        }
    }
    EncryptedStorage.setItem('accounts', JSON.stringify(allAccounts)).catch(() => { console.error('Could not setup Updated list.'); });
}

export function deleteAccount(account) {
    allAccounts.splice(account.id - 1, 1);
    EncryptedStorage.setItem('accounts', JSON.stringify(allAccounts)).catch(() => { console.error('Could not setup Updated list.'); });
}

export function appendAccountList(accountList, newAccount, setShowError, setError, setShowHome) {
    accountList = accountList.reverse();
    accountList.push(newAccount);
    accountList = accountList.reverse();
    EncryptedStorage.setItem('accounts', JSON.stringify(accountList)).catch((e) => {
        setError('Got Error while setting accounts in storage.');
        setShowError(true);
        setShowHome(false);
    });
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});


