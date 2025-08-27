import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputKeyPressEventData, Image } from 'react-native';
import { styles } from './styles';
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

    const returnOTP = () => {
        return otp.join('');
    }

    const submittedRef = useRef(false);
    useEffect(() => {
        const code = returnOTP();
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
            <Image source={require('../../assets/OTP/chat.png')} style={styles.otpImage} />
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
export default OTPScreen;