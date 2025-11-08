import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { checkIfCompromised, getLogoName } from './AddPasswordScreen';

export const generatePassword = (length = 15) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let pwd = '';
  for (let i = 0; i < length; i++) {
    pwd += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return pwd;
};

const UpdatePasswordScreen = (props) => {
  const password = props.password;

  const [name, setName] = useState(password.name);
  const [url, setUrl] = useState(password.url);
  const [username, setUsername] = useState(password.username);
  const [passwordText, setPasswordText] = useState(password.password);
  const [showPassword, setShowPassword] = useState(false);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPasswordText(newPassword);
  };

  const handleSave = async () => {
    const updatedPassword = {
      id: password.id,
      name: name,
      url: url,
      username: username,
      password: passwordText,
      dateAdded: password.dateAdded,
      isCompromised: checkIfCompromised(passwordText),
      icon: getLogoName(name),
      iconBg: '',
    };
    let done = props.saveChanges(updatedPassword, props.setShowPasswordDetails, props.setShowUpdatePassword);
    if(done) {
      props.setDisplayedPassword(updatedPassword);
      Alert.alert('New password has been saved.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              props.setShowUpdatePassword(false);
              props.setShowPasswordDetails(true);
            }}
            style={styles.backButton}
          >
            <Icon name="chevron-back" size={28} color="#4A5568" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>UPDATE</Text>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NAME</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Website/App Name"
              placeholderTextColor="#CBD5E0"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL</Text>
            <TextInput
              style={styles.input}
              value={url}
              onChangeText={setUrl}
              placeholder="Website/App Link"
              placeholderTextColor="#CBD5E0"
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL / USERNAME</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Email / Username"
              placeholderTextColor="#CBD5E0"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* <TextInput
            style={styles.input}
            value={passwordText}
            onChangeText={setPasswordText}
            placeholder="Password"
            placeholderTextColor="#CBD5E0"
            secureTextEntry
          /> */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.passInputAndGenerate}>
              <View style={[styles.passInputBlock, { flexDirection: 'row' }]}>
                <TextInput
                  style={styles.passInput}
                  value={passwordText}
                  onChangeText={setPasswordText}
                  placeholder="Password"
                  placeholderTextColor="#CBD5E0"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.iconButton}
                >
                  <Icon
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={22}
                    color="#FF6B6B"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.generateButton}
                onPress={handleGeneratePassword}
                activeOpacity={0.8}
              >
                <Text style={styles.generateButtonText}>GENERATE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: '#4A5568',
    paddingHorizontal: 20,
    marginBottom: 30,
    letterSpacing: -1,
    transform: [{scaleY: 1.30}],
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#718096',
    marginBottom: 8,
    letterSpacing: 0.5,
    transform: [{scaleY: 1.2}],
  },
  input: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 15,
    color: '#4A5568',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  passInput: {
    flex: 1,
    fontSize: 15,
    color: '#4A5568',
  },
  passInputBlock: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 6,
    fontSize: 15,
    color: '#4A5568',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconButton: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  passInputAndGenerate: {
    flexDirection: 'row',
  },
  generateButton: {
    borderWidth: 2,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  generateButtonText: {
    color: '#FF6B6B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F7FAFC',
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default UpdatePasswordScreen;
