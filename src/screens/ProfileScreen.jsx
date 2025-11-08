import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNav from '../../components/BottomNav';

export default function ProfileScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <Text style={styles.title}>PROFILE</Text>

      {/* Profile image */}
      <View style={styles.avatarContainer}>
        <Image
          source={require('../../assets/images/awais.jpg')} // replace with actual user image
          style={styles.avatar}
        />
        <Text style={styles.name}>{props.user.name}</Text>
        <Text style={styles.email}>{props.user.email}</Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menu}>
        <Option icon="person-outline" label="Update Profile" deleteAccount={props.deleteAccount} />
        <Option icon="key-outline" label="Change Master PIN" deleteAccount={props.deleteAccount} />
        <Option icon="trash-outline" label="Delete Account" deleteAccount={props.deleteAccount} />
      </View>
      <BottomNav
        screenName={'profile'}
        currentScreen={props.setShowProfile}
        setShowAddPassword={props.setShowAddPassword}
        setShowHomeScreen={props.setShowHomeScreen}
        setShowProfile={props.setShowProfile}
      />
    </SafeAreaView>
  );
}

const Option = ({ icon, label, deleteAccount}) => (
  <TouchableOpacity style={styles.option} onPress={() => {
    if(icon === 'person-outline') {
      console.log('update profile');
    }
    else if(icon === 'key-outline') {
      console.log('change pin');
    }
    else if(icon === 'trash-outline') {
      deleteAccount();
    }
  }} >
    <Icon name={icon} size={20} color="#FF5A5F" />
    <Text style={styles.optionText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#4A5568',
    marginTop: 40,
    marginLeft: '5%',
    letterSpacing: -1,
    transform: [{scaleY: 1.30}],
    alignSelf: 'flex-start',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF5A5F',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A5568',
    marginTop: 12,
  },
  email: {
    color: '#A0A0A0',
    fontSize: 14,
    marginTop: 3,
  },
  menu: {
    width: '90%',
    marginTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  optionText: {
    marginLeft: 14,
    fontSize: 15,
    color: '#333',
  },
  version: {
    position: 'absolute',
    bottom: 80,
    left: 40,
    color: '#B0B0B0',
    fontSize: 12,
  },
});
