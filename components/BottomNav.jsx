import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function BottomNav(props) {
    return (
        <>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navIcons}onPress={() => {
                        props.setShowProfile(false);
                        props.setShowHomeScreen(true);
                    }}>
                        <Icon name={props.screenName === 'home' ? 'home' : 'home-outline'} size={24} color={props.screenName === 'home' ? '#FF6B6B' : '#555a70'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addButton} onPress={() => {
                        props.currentScreen(false);
                        props.setShowAddPassword(true);
                    }}>
                        <Icon name="add" color="#fff" size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navIcons} onPress={() => {
                        props.setShowHomeScreen(false);
                        props.setShowProfile(true);
                    }}>
                        <Icon name={props.screenName === 'profile' ? 'person' : 'person-outline'} size={24} color={props.screenName === 'profile' ? '#FF6B6B' : '#555a70'} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    bottomContainer: {
        width: '100%',
        height: 98,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
    },
    bottomNav: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
        width: '90%',
        marginLeft: '5%',
        marginBottom: 15,
        paddingVertical: 22.5,
        borderRadius: 15,
        position: 'absolute',
        bottom: 0,
    },
    navIcons: {
        width: '32%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF6B6B',
        elevation: 15,
        position: 'absolute',
        left: '50%',
        bottom: 22.5,
        transform: [{ translateX: -30 }],
    },
});

export default BottomNav;
