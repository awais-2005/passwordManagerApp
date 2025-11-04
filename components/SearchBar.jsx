import React from 'react';
import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountCard from './AccountCard';

function SearchBar(props) {
    const [searchText, setSearchText] = React.useState('');
    return (
        <View style={styles.searchBarAndCardsWrapper}>
            <View style={styles.searchBarContainer}>
                <View style={styles.searchIcon}>
                    <Icon name="search-outline" size={22.5} color="grey"/>
                </View>
                <TextInput onChangeText={setSearchText} value={searchText} placeholder="Search account here..." placeholderTextColor="grey" style={styles.searchInput}/>
            </View>
            <ScrollView style={styles.listOfAccountCards} contentContainerStyle={styles.alignItemsCenter}>
                {props.accountList.map((account) => {
                    if(account.accountName.toLowerCase().includes(searchText.toLowerCase())) {
                        return (
                            <AccountCard
                                setDisplayAcc={props.setDisplayAccount}
                                setShowAcc={props.setShowAccount} setShowHom={props.setShowHome}
                                currentAccount={account}
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
        borderWidth: 1,
        borderColor: 'grey',
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
        color: '#3c3c3c',
        fontSize: 17,
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
