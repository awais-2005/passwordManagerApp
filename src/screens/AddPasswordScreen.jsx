import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { generatePassword } from './UpdatePasswordScreen';

const AddPasswordScreen = (props) => {

  const [name, setName] = useState('Google');
  const [url, setUrl] = useState('www.google.com');
  const [username, setUsername] = useState('awais852689');
  const [password, setPassword] = useState('852963741852');
  const [showPassword, setShowPassword] = useState(true);
  // {
  //             id: '5',
  //             name: 'Google',
  //             url: 'www.google.com',
  //             username: 'james.smith@mail.gg',
  //             password: 'Goo@gle123',
  //             dateAdded: '05 Sep 2022',
  //             isCompromised: false,
  //             icon: 'logo-google',
  //             iconBg: '#4285F4',
  //         }
  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
  };

  const handleAddPassword = () => {
    props.addNewPassword({
      id: getId(),
      name: name,
      url: url,
      username: username,
      password: password,
      dateAdded: getTimeStamp(),
      isCompromised: checkIfCompromised(password),
      icon: getLogoName(name),
      iconBg: '',
    }, props.setShowHomeScreen, props.setShowAddPassword);
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.setShowAddPassword(false);
            props.setShowHomeScreen(true);
          }}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={28} color="#4A5568" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>ADD NEW</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.passInputAndGenerate}>
              <View style={[styles.passInputBlock, {flexDirection: 'row'}]}>
                <TextInput
                  style={styles.passInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor="#CBD5E0"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.iconButton}
                >
                  <Icon
                    name={showPassword ?  'eye-outline' : 'eye-off-outline'}
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

      {/* Add Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddPassword}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>ADD PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function getTimeStamp() {
  let date = new Date().toString().split(' ');
  date = date[1] + ' ' + date[2] + ' ' + date[3] + ' ' + date[4];
  return date;
}
function getId() {
  return getTimeStamp().replace(/[\s:]/g, '');
}

export function getLogoName(name) {
  const nameToLower = name.toLowerCase();
  if(nameToLower.includes('google')) {
    return 'logo-google';
  }
  if(nameToLower.includes('insta')) {
    return 'logo-instagram';
  }
  if(nameToLower.includes('linkedin')) {
    return 'logo-linkedin';
  }
  if(nameToLower.includes('twitter') || nameToLower === 'x') {
    return 'logo-x';
  }
  if(nameToLower.includes('github')) {
    return 'logo-github';
  }
  if(nameToLower.includes('facebook')) {
    return 'logo-facebook';
  }
  if(nameToLower.includes('amazon')) {
    return 'logo-amazon';
  }
  if(nameToLower.includes('discord')) {
    return 'logo-discord';
  }
  if(nameToLower.includes('microsoft')) {
    return 'logo-microsoft';
  }
  if(nameToLower.includes('tiktok')) {
    return 'logo-tiktok';
  }
  if(nameToLower.includes('reddit')) {
    return 'logo-reddit';
  }
  if(nameToLower.includes('snapchat')) {
    return 'logo-snapchat';
  }
  if(nameToLower.includes('threads')) {
    return 'logo-threads';
  }
  if(nameToLower.includes('tumblr')) {
    return 'logo-tumblr';
  }
  if(nameToLower.includes('twitch')) {
    return 'logo-twitch';
  }
  if(nameToLower.includes('figma')) {
    return 'logo-figma';
  }
  if(nameToLower.includes('apple')) {
    return 'logo-apple';
  }
  if(nameToLower.includes('soundcloud')) {
    return 'logo-soundcloud';
  }
  if(nameToLower.includes('youtube')) {
    return 'logo-youtube';
  }
  if(nameToLower.includes('netflix')) {
    return 'netflix';
  }
}

export function checkIfCompromised(pwd) {
  if (pwd.length < 9) {
    return true;
  }
  return false;
}

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
    fontSize: 42,
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
    flex: 1,
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
  addButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default AddPasswordScreen;
