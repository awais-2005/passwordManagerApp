import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function Navbar() {
  return (
     <View style={styles.main}>
            <View style={styles.navBar}>
                <Icon name="settings-outline" size={30} color="#000" />
                <Text style={styles.navBarTitle}>Password Manager</Text>
                <Icon name="person-circle-outline" size={35} color="#000" />
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    navBarTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default Navbar;
