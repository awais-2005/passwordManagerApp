import React from 'react';
import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountCard from './AccountCard';
import { listOfAccounts } from '../App';

function SearchBar(props) {
    const [searchText, setSearchText] = React.useState('');
    return (
        <View style={styles.searchBarAndCardsWrapper}>
            <View style={styles.searchBarContainer}>
                <View style={styles.searchIcon}>
                    <Icon name="search-outline" size={20}/>
                </View>
                <TextInput onChangeText={setSearchText} value={searchText} placeholder="Search account here..." style={styles.searchInput}/>
            </View>
            <ScrollView style={styles.listOfAccountCards} contentContainerStyle={styles.alignItemsCenter}>
                {listOfAccounts.map((account) => {
                    if(account.accountName.toLowerCase().includes(searchText.toLowerCase())) {
                        return (
                            <AccountCard
                                setDisplayedAccount={props.setDisplayedAccount}
                                setShowAccount={props.setShowAccount} setShowHome={props.setShowHome}
                                accountName={account.accountName} username={account.username} password={account.password}
                            />
                        );
                    }
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarAndCardsWrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    searchBarContainer: {
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 0.3,
        paddingHorizontal: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    searchIcon: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    listOfAccountCards: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    alignItemsCenter: {
        alignItems: 'center',
    },
});

export default SearchBar;
