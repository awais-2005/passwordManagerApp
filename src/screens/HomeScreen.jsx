import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import BottomNav from '../../components/BottomNav';

function HomeScreen(props) {

    const passwords = props.passwords;
    const [compromisedCount, setCompromisedCount] = useState(0);
    useEffect(() => {
        let count = 0;
        passwords.forEach((pwd) => {
            if(pwd.isCompromised) {
                count++;
            }
        });
        setCompromisedCount(count);
    }, [compromisedCount, passwords]);
    const passwordCount = passwords.length;

    const [searchQuery, setSearchQuery] = useState('');
    const filteredPasswords = passwords.filter((pwd) =>
        pwd.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCopy = (password) => {
        Clipboard.setString(password);
        // You can add a toast notification here
    };

    const renderPasswordItem = ({ item }) => (
        <TouchableOpacity
            style={styles.passwordItem}
            activeOpacity={0.7}
            onPress={() => {
                props.setShowPasswordDetails(true);
                props.setDisplayedPassword(item);
                props.setShowHomeScreen(false);
            }}
        >
            <View style={[styles.iconContainer, { backgroundColor: '#535973' }]}>
                {item.icon ?
                <Icon name={item.icon} size={28} color="#FFFFFF" /> :
                <Text style={styles.letterIcon}>{item.name.toUpperCase()[0]}</Text>}
            </View>
            <Text style={styles.passwordName}>{item.name}</Text>
            <TouchableOpacity
                style={styles.copyButton}
                onPress={() => handleCopy(item.password)}
                activeOpacity={0.6}
            >
                <Icon name="copy-outline" size={22} color="#FF6B6B" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>NO RESULTS</Text>
            <Text style={styles.emptyText}>
                Seem like, No password is currently stored.
            </Text>
        </View>
    );

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Logo */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <View style={styles.asterisks}>
                        <Text style={styles.asterisk}>*</Text>
                        <Text style={styles.asterisk}>*</Text>
                        <Text style={styles.asterisk}>*</Text>
                    </View>
                    {/* <View style={styles.underline} /> */}
                </View>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{passwordCount}</Text>
                    <Text style={styles.statLabel}>Passwords{'\n'}Stored</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{compromisedCount}</Text>
                    <Text style={styles.statLabel}>Passwords{'\n'}Compromised</Text>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#CBD5E0" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Websites..."
                    placeholderTextColor="#CBD5E0"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        onPress={() => setSearchQuery('')}
                        style={styles.clearButton}
                    >
                        <Icon name="close-circle" size={20} color="#CBD5E0" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Password List */}
            <FlatList
                data={filteredPasswords}
                renderItem={renderPasswordItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={renderEmptyState}
                // ListFooterComponent={renderFooter}
                showsVerticalScrollIndicator={false}
            />

            <BottomNav
                screenName={'home'}
                currentScreen={props.setShowHomeScreen}
                setShowAddPassword={props.setShowAddPassword}
                setShowHomeScreen={props.setShowHomeScreen}
                setShowProfile={props.setShowProfile}
            />
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        alignItems: 'flex-start',
    },
    logoContainer: {
        paddingHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#FF6B6B',

    },
    asterisks: {
        marginBottom: -4,
        flexDirection: 'row',
        gap: 5,
    },
    asterisk: {
        fontSize: 24,
        color: '#FF6B6B',
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 15,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        padding: 20,
    },
    statNumber: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#FF6B6B',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 14,
        color: '#718096',
        lineHeight: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FF6B6B',
        paddingHorizontal: 15,
        height: 50,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#4A5568',
    },
    clearButton: {
        padding: 5,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    passwordItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        padding: 18,
        marginBottom: 12,
    },
    letterIcon: {
        fontSize: 26,
        fontWeight: '900',
        color: '#fff',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    passwordName: {
        flex: 1,
        fontSize: 20.5,
        fontWeight: '600',
        color: '#4A5568',
    },
    copyButton: {
        padding: 8,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A5568',
        marginBottom: 10,
        letterSpacing: 1,
    },
    emptyText: {
        fontSize: 14,
        color: '#CBD5E0',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 13,
        color: '#CBD5E0',
        fontStyle: 'italic',
    },
});

export default HomeScreen;
