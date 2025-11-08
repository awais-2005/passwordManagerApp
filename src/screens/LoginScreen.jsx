import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LoginScreen(props) {
  const [pin, setPin] = useState('');

  const handlePress = (num) => {
    if (pin.length < 6) {
      setPin(pin + num);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const checkPin = () => {
    if(pin === props.user.pin) {
      setTimeout(() => {
        props.setShowLogin(false);
        props.setShowHomeScreen(true);
      }, 100);
      }
  };

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 6; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: i < pin.length ? '#FF6B6B' : '#FFF' },
          ]}
        />
      );
    }
    return <View style={styles.dotsContainer}>{dots}</View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter your PIN</Text>

      {renderDots()}

      {checkPin()}

      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'x'].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.key}
            onPress={() => {
              if (item === 'x') {handleBackspace();}
              else if (item !== '') {handlePress(item);}
            }}
            activeOpacity={0.6}
          >
            {item === 'x' ? (
              <Icon name="backspace" size={30} color={'#1f2a38'}/>
            ) : (
              <Text
                style={[
                  styles.keyText,
                  item === '' && { color: 'transparent' },
                ]}
              >
                {item}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot PIN?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2a38',
    marginBottom: 30,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: '30%',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderColor: '#FF6B6B',
    borderWidth: 2,
    backgroundColor: '#FFF',
  },
  keypad: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
  },
  key: {
    width: '30%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 19,
    fontWeight: '500',
    color: '#1f2a38',
  },
  forgotContainer: {
    position: 'absolute',
    bottom: 55,
    left: 50,
  },
  forgotText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
  },
});
