import React, { useState } from 'react';
import { Linking } from 'react-native';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const COUNTRIES = [
    { code: 'VN', name: 'Việt Nam', flag: '🇻🇳', dial: '+84' },
    { code: 'US', name: 'United States', flag: '🇺🇸', dial: '+1' },
    { code: 'KR', name: 'Korea', flag: '🇰🇷', dial: '+82' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', dial: '+81' },
    { code: 'FR', name: 'France', flag: '🇫🇷', dial: '+33' },
];

const SignUpScreen = ({ navigation }: any) => {
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState(COUNTRIES[0]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [checked, setChecked] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: '#FAFDF3' }}>
            <View style={{ height: 64, justifyContent: 'center' }}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <View style={styles.backCircle}>
                        <Ionicons name="chevron-back-outline" size={24} color="#000" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Đăng ký</Text>
                <Text style={styles.label}>Nhập số điện thoại của bạn để tiếp tục</Text>
                {/* Row chọn quốc gia + nhập số */}
                <View style={styles.inputRow}>
                    {/* Country Selector */}
                    <View style={{ position: 'relative' }}>
                        <TouchableOpacity
                            style={styles.countrySelector}
                            onPress={() => setOpenDropdown(!openDropdown)}
                        >
                            <Text style={styles.flag}>{country.flag}</Text>
                            <Text style={styles.prefix}>{country.dial}</Text>
                            <Text style={styles.arrow}>▼</Text>
                        </TouchableOpacity>

                        {openDropdown && (
                            <View style={styles.dropdown}>
                                <FlatList
                                    data={COUNTRIES}
                                    keyExtractor={item => item.code}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.countryItem}
                                            onPress={() => {
                                                setCountry(item);
                                                setOpenDropdown(false);
                                            }}
                                        >
                                            <Text style={styles.flag}>{item.flag}</Text>
                                            <Text style={styles.prefix}>{item.dial}</Text>
                                            <Text style={styles.countryName}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        )}
                    </View>

                    {/* Phone Input */}
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={styles.phoneInput}
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Số điện thoại"
                        />
                        {phone.length > 0 && (
                            <TouchableOpacity
                                style={styles.clearButton}
                                onPress={() => setPhone('')}
                            >
                                <Text style={styles.clear}>✕</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Checkbox + điều khoản */}
                <View style={styles.termsRow}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(!checked)}
                        color="#262626"
                    />
                    <Text style={styles.desc}>
                        Bằng cách click vào nút Tiếp tục, bạn đã đồng ý với{' '}
                        <Text
                            style={styles.link}
                            onPress={() => Linking.openURL('https://example.com/privacy-policy.pdf')}
                        >
                            Chính sách quyền riêng tư
                        </Text>{' '}
                        và{' '}
                        <Text
                            style={styles.link}
                            onPress={() => Linking.openURL('https://example.com/terms.pdf')}
                        >
                            Điều khoản dịch vụ
                        </Text>{' '}
                        của chúng tôi.
                    </Text>
                </View>

                {/* Nút tiếp tục */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        { opacity: checked ? 1 : 0.5 },
                    ]}
                    disabled={!checked}
                    onPress={() =>
                        navigation.navigate('OTPScreen', {
                            phone: country.dial + phone,
                        })
                    }
                >
                    <Text style={styles.buttonText}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFDF3', padding: 24 },
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
        color: '#525252',
        fontWeight: 'bold',
    },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
    label: { fontSize: 16, marginBottom: 16, color: '#5D5D5D' },

    // Row chứa selector + input
    inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },

    countrySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#5D5D5D',
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginRight: 8,
        minWidth: 90,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    flag: { fontSize: 20, marginRight: 6 },
    prefix: { fontSize: 16, marginRight: 4 },
    arrow: { fontSize: 12, color: '#666' },

    dropdown: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#5D5D5D',
        zIndex: 1000,
        maxHeight: 200,
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderColor: '#5D5D5D',
    },
    countryName: { marginLeft: 8, fontSize: 16 },

    phoneInput: {
        borderWidth: 1,
        borderColor: '#5D5D5D',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    clearButton: {
        position: 'absolute',
        right: 12,
        top: '40%',
        transform: [{ translateY: -10 }],
    },
    clear: { fontSize: 16, color: '#888' },

    termsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    desc: {
        flex: 1,
        fontSize: 12,
        color: '#5D5D5D',
        fontFamily: 'font'
    },
    link: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#262626',
    },


    button: {
        backgroundColor: '#29B26B',
        padding: 16,
        borderRadius: 24,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default SignUpScreen;
