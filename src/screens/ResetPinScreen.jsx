import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ResetPinScreen = (props) => {
    const [currentPin, setCurrentPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [showNewPin, setShowNewPin] = useState(false);
    const [showCurrentPin, setShowCurrentPin] = useState(false);

    const handleSaveChanges = () => {
        props.saveNewPin(newPin);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.headerContainer} onPress={() => {
                props.setShowResetPinScreen(false);
                props.setShowProfile(true);
            }}>
                <Icon name="chevron-back" size={24} color="#4A5568" />
            </TouchableOpacity>

            <Text style={styles.title}>Reset PIN</Text>

            <ScrollView style={styles.form}>
                <Text style={styles.label}>CURRENT PIN</Text>
                <View style={styles.passInputAndGenerate}>
                    <View style={[styles.passInputBlock, { flexDirection: 'row' }]}>
                        <TextInput
                            style={styles.passInput}
                            value={currentPin}
                            onChangeText={setCurrentPin}
                            placeholder="Enter your current 6-digit pin."
                            placeholderTextColor="#CBD5E0"
                            secureTextEntry={!showCurrentPin}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            onPress={() => setShowCurrentPin(!showCurrentPin)}
                            style={styles.iconButton}
                        >
                            <Icon
                                name={showCurrentPin ? 'eye-outline' : 'eye-off-outline'}
                                size={22}
                                color="#FF6B6B"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.label}>NEW PIN</Text>
                <View style={styles.passInputAndGenerate}>
                    <View style={[styles.passInputBlock, { flexDirection: 'row' }]}>
                        <TextInput
                            style={styles.passInput}
                            value={newPin}
                            onChangeText={setNewPin}
                            placeholder="Enter a new 6-digit pin."
                            placeholderTextColor="#CBD5E0"
                            secureTextEntry={!showNewPin}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            onPress={() => setShowNewPin(!showNewPin)}
                            style={styles.iconButton}
                        >
                            <Icon
                                name={showNewPin ? 'eye-outline' : 'eye-off-outline'}
                                size={22}
                                color="#FF6B6B"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={handleSaveChanges} disabled={props.user.pin !== currentPin}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ResetPinScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    headerContainer: {
        paddingTop: 20,
        paddingBottom: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        color: '#4A5568',
        marginBottom: 45,
        letterSpacing: -1,
        transform: [{ scaleY: 1.30 }],
    },
    form: {
        marginBottom: 40,
    },
    inputGroup: {
        marginBottom: 25,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: '#718096',
        marginTop: 15,
        marginBottom: 8,
        letterSpacing: 0.5,
        transform: [{ scaleY: 1.2 }],
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
    passInputAndGenerate: {
        flexDirection: 'row',
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
    button: {
        backgroundColor: '#FF6B6B',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
