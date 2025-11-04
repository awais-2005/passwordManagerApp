import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function Navbar() {
  return (
     <View style={styles.main}>
            <View style={styles.navBar}>
                <View style={styles.icon}>
                    <Icon name="settings-outline" size={30} color="grey" />
                </View>
                <Text style={styles.navBarTitle}>Password Manager</Text>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    navBar: {
        width: '100%',
        height: 65,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    navBarTitle: {
        flex: 1,
        fontSize: 23,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000',
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 65,
        width: 65,
        position: 'absolute',
        top: 0,
        right: 0,
    },
});

export default Navbar;
