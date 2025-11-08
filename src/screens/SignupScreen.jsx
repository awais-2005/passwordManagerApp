import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SignupScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [answer, setAnswer] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.lockIcon}>
          <Icon name="lock-closed-outline" size={28} color="#fff" />
        </View>

        <Text style={styles.title}>Let's Get Started</Text>
        <Text style={styles.subtitle}>
          Securely save all your passwords in one place.
        </Text>

        {/* Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>WHERE WERE YOU BORN?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your birth place"
            placeholderTextColor="#999"
            value={answer}
            onChangeText={setAnswer}
          />
        </View>

        {/* PIN */}
        <Text style={styles.pinHeading}>Set Your App PIN</Text>
        <Text style={styles.pinSub}>Must be 6 digits.</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>NEW PIN</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••"
            placeholderTextColor="#999"
            secureTextEntry
            keyboardType="numeric"
            maxLength={6}
            value={pin}
            onChangeText={setPin}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CONFIRM PIN</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••"
            placeholderTextColor="#999"
            secureTextEntry
            keyboardType="numeric"
            maxLength={6}
            value={confirmPin}
            onChangeText={setConfirmPin}
          />
        </View>
        <Text style={[styles.pinConfirmation, {color: pin && confirmPin && pin !== confirmPin ? 'rgba(255, 42, 42, 1)' : 'rgba(14, 175, 14, 1)'}]}>{pin && confirmPin ? (pin !== confirmPin ? 'Does not match' : 'Matched') : ''}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {
          props.saveUser({
            name: name,
            email: email,
            answer: answer,
            pin: pin,
          });
        }} disabled={!(pin !== '' && pin === confirmPin)}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By creating an account, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> &{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  lockIcon: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 999,
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 7,
    transform: [{scaleY: 1.3}],
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 16,
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
  pinHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A5568',
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 5,
    transform: [{scaleY: 1.3}]
  },
  pinSub: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  pinConfirmation: {
    color: 'red',
    marginTop: -10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    width: '100%',
    paddingVertical: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  terms: {
    textAlign: 'center',
    color: '#4A5568',
    fontSize: 12,
    marginTop: 12,
    lineHeight: 18,
  },
  link: {
    color: '#FF6B6B',
    textDecorationLine: 'underline',
  },
});
