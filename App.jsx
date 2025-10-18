import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import AddButton from './components/AddButton';
import AddNewAccountPopup from './components/AddNewAccountPopup';

export default function App() {
    const [showAddAccountPopup, setShowAddAccountPopup] = React.useState(false);
    const [showAddButton, setShowAddButton] = React.useState(true);
    return (
        <View style={styles.main}>
            <Navbar/>
            <SearchBar/>
            {showAddButton && <AddButton showAddPopup={showAddAccountPopup} setShowAddPopup={setShowAddAccountPopup} showAdd={showAddButton} setShowAdd={setShowAddButton}/>}
            {showAddAccountPopup && (<AddNewAccountPopup showAddPopup={showAddAccountPopup} setShowAddPopup={setShowAddAccountPopup} showAdd={showAddButton} setShowAdd={setShowAddButton}/>)}
        </View>
    );
}

export function appendAccountList(newAccount) {
    listOfAccounts = listOfAccounts.reverse();
    listOfAccounts.push(newAccount);
    listOfAccounts = listOfAccounts.reverse();
}

export let listOfAccounts = [
    {
        id: 1,
        accountName: 'Google',
        username: 'awais123',
        password: 'abc123',
    },
    {
        id: 2,
        accountName: 'Facebook',
        username: 'awais.fb',
        password: 'abc123',
    },
    {
        id: 3,
        accountName: 'Instagram',
        username: 'awais.ig',
        password: 'abc123',
    },
    {
        id: 4,
        accountName: 'Twitter',
        username: 'awais_tw',
        password: 'abc123',
    },
    {
        id: 5,
        accountName: 'LinkedIn',
        username: 'awais_li',
        password: 'abc123',
    },
    {
        id: 6,
        accountName: 'GitHub',
        username: 'awais-gh',
        password: 'abc123',
    },
    {
        id: 7,
        accountName: 'Reddit',
        username: 'awais_rd',
        password: 'abc123',
    },
    {
        id: 8,
        accountName: 'Snapchat',
        username: 'awais_sc',
        password: 'abc123',
    },
];

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});


