import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData, Image } from 'react-native';

const OTPScreen = ({ navigation }: any) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputsRef = useRef<Array<TextInput | null>>([]);
    const [secondsLeft, setSecondsLeft] = useState<number>(30);

    useEffect(() => {
        // auto-focus first input when screen mounts
        setTimeout(() => {
            inputsRef.current[0]?.focus();
        }, 100);
    }, []);

    useEffect(() => {
        // start countdown when component mounts or secondsLeft is set
        if (secondsLeft <= 0) return;
        const t = setInterval(() => {
            setSecondsLeft(s => {
                if (s <= 1) {
                    clearInterval(t);
                    return 0;
                }
                return s - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [secondsLeft]);

    const handleChange = (value: string, idx: number) => {
        // only keep last char (should be single because maxLength=1)
        const char = value ? value.slice(-1) : '';
        const newOtp = [...otp];
        newOtp[idx] = char;
        setOtp(newOtp);

        if (char && idx < inputsRef.current.length - 1) {
            // move focus to next
            inputsRef.current[idx + 1]?.focus();
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, idx: number) => {
        if (e.nativeEvent.key === 'Backspace') {
            // if current has value, clear it; otherwise move to previous and clear
            if (otp[idx]) {
                const newOtp = [...otp];
                newOtp[idx] = '';
                setOtp(newOtp);
            } else if (idx > 0) {
                inputsRef.current[idx - 1]?.focus();
                const newOtp = [...otp];
                newOtp[idx - 1] = '';
                setOtp(newOtp);
            }
        }
    };

    const handleResend = () => {
        if (secondsLeft > 0) return; // guard
        // TODO: call resend OTP API here
        console.log('Resend OTP requested');
        setSecondsLeft(30);
    };

    const submittedRef = useRef(false);
    useEffect(() => {
        const code = otp.join('');
        if (code.length === otp.length && code.trim().length === otp.length && !submittedRef.current) {
            submittedRef.current = true;
            // small delay for UX
            setTimeout(() => {
                navigation.navigate('LoadingScreen');
            }, 150);
        }
    }, [otp, navigation]);
    return (
        <View style={styles.container}>
            <View style={styles.centerBox}>
                <Text style={styles.label}>Mã OTP vừa được gửi đến điện thoại của bạn. Vui lòng kiểm tra và điền vào ô bên dưới.</Text>
            </View>
            <Image source={require('../../assets/onboard/chat.png')} style={styles.otpImage} />
            <View style={styles.otpRow}>
                {otp.map((v, i) => (
                    <TextInput
                        key={i}
                        ref={el => (inputsRef.current[i] = el)}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={v}
                        onChangeText={text => handleChange(text, i)}
                        onKeyPress={e => handleKeyPress(e, i)}
                        returnKeyType={i === otp.length - 1 ? 'done' : 'next'}
                    />
                ))}
            </View>
            <TouchableOpacity
                style={[styles.resend, secondsLeft > 0 && { opacity: 0.5 }]}
                onPress={handleResend}
                disabled={secondsLeft > 0}
            >
                <Text style={styles.resendText}>
                    {secondsLeft > 0 ? `Gửi lại sau (${secondsLeft}s)` : 'Gửi lại'}
                </Text>
            </TouchableOpacity>
            {/* Auto-submit when all OTP digits are entered */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFDF3', paddingHorizontal: 24 },
    backButton: {
        position: 'absolute',
        top: 24,
        left: 16,
        zIndex: 10,
    },
    backCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    backArrow: {
        fontSize: 22,
        color: '#333',
        fontWeight: 'bold',
    },
    centerBox: {
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 16,
    },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
    label: { fontSize: 16, marginBottom: 8, color: '#5D5D5D', textAlign: 'left' },
    otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    otpInput: { width: 43.83, height: 56, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, textAlign: 'center', fontSize: 20, backgroundColor: '#fff' },
    resend: { marginBottom: 24 },
    resendText: { color: '#525252', fontSize: 16, textAlign: 'center', textDecorationLine: 'underline' },
    button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 24, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    otpImage: { width: 80, height: 80, resizeMode: 'contain', alignSelf: 'center', marginBottom: 30 },
});

export default OTPScreen;
