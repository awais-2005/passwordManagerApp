import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';

const PasswordDetailScreen = (props) => {

  const [showPassword, setShowPassword] = useState(false);
  const handleCopy = (text, type) => {
    Clipboard.setString(text);
    Alert.alert('Copied', `${type} copied to clipboard`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Password',
      'Are you sure you want to delete this password?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            props.deletePassword(props.password, props.setShowHomeScreen, props.setShowPasswordDetails);
          },
        },
      ]
    );
  };

  const handleUpdate = () => {
    props.setShowPasswordDetails(false);
    props.setShowUpdatePassword(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.setShowPasswordDetails(false);
            props.setShowHomeScreen(true);
          }}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={28} color="#4A5568" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>{props.password.name.toUpperCase()}</Text>

      {/* Info Fields */}
      <View style={styles.infoContainer}>
        {/* Date Added */}
        <View style={styles.infoRow}>
          <Icon name="calendar-outline" size={22} color="#718096" />
          <Text style={styles.infoText}>{props.password.dateAdded}</Text>
        </View>

        {/* Website URL */}
        <View style={styles.infoRow}>
          <Icon name="link-outline" size={22} color="#718096" />
          <Text style={styles.infoText}>{props.password.url}</Text>
        </View>

        {/* Username/Email */}
        <View style={styles.infoRow}>
          <Icon name="person-outline" size={22} color="#718096" />
          <Text style={styles.infoText}>{props.password.username}</Text>
        </View>

        {/* Password */}
        <View style={styles.infoRow}>
          <Icon name="lock-closed-outline" size={22} color="#718096" />
          <Text style={styles.infoText}>
            {showPassword ? props.password.password : '••••••••'}
          </Text>
          <View style={styles.passwordActions}>
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.iconButton}
            >
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#FF6B6B"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCopy(props.password.password, 'Password')}
              style={styles.iconButton}
            >
              <Icon name="copy-outline" size={22} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.8}
        >
          <Text style={styles.deleteButtonText}>DELETE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdate}
          activeOpacity={0.8}
        >
          <Text style={styles.updateButtonText}>UPDATE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  statusContainer: {
    marginBottom: 15,
  },
  statusText: {
    fontSize: 13,
    color: '#CBD5E0',
    fontWeight: '500',
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#4A5568',
    marginBottom: 40,
    letterSpacing: -1,
    transform: [{scaleY: 1.30}],
  },
  infoContainer: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: '#718096',
    marginLeft: 15,
  },
  passwordActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingBottom: 30,
  },
  deleteButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  updateButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default PasswordDetailScreen;
