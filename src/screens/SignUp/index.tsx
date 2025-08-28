import React, { useState } from 'react';
import { TouchableOpacity, View, Text, FlatList, TextInput, Linking } from 'react-native';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Checkbox } from 'react-native-paper';
const COUNTRIES = [
    { code: 'VN', name: ' Việt Nam', flag: '🇻🇳', dial: '+84' },
    { code: 'US', name: 'United States', flag: '🇺🇸', dial: '+1' },
    { code: 'KR', name: 'Korea', flag: '🇰🇷', dial: '+82' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', dial: '+81' },
    { code: 'FR', name: 'France', flag: '🇫🇷', dial: '+33' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', dial: '+49' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', dial: '+39' },
]

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
                    <View style={{ position: 'relative' }}>
                        <TouchableOpacity style={styles.countrySelector} onPress={() => setOpenDropdown(!openDropdown)}>
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
                                        <TouchableOpacity style={styles.countryItem} onPress={() => { setCountry(item); setOpenDropdown(false); }}>
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
                            keyboardType='phone-pad'
                            value={phone}
                            onChangeText={setPhone}
                            placeholder='Số điện thoại'
                        />
                        {phone.length > 0 && (
                            <TouchableOpacity
                                style={styles.clearButton}
                                onPress={() => setPhone('')}
                            ><Ionicons name="close" size={16} color="#5D5D5D" /></TouchableOpacity>
                        )}
                    </View>
                </View>

                {/*Checkbox + điều khoản */}
                <View style={styles.termsRow}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(!checked)}
                        color='#262626'
                    />
                    <Text style={styles.desc}>
                        Bằng cách click vào nút Tiếp tục, bạn đã đồng ý với{' '}
                        <Text style={styles.link} onPress={() => Linking.openURL('')}>Chính sách quyền riêng tư</Text>{' '}
                        và {' '}
                        <Text style={styles.link} onPress={() => Linking.openURL('')}>Điều khoản dịch vụ</Text>{' '}
                        của chúng tôi.
                    </Text>
                </View>

                {/* Nút tiếp tục */}
                <TouchableOpacity style={[styles.button, { opacity: checked ? 1 : 0.5 }]}
                    disabled={!checked}
                    onPress={() => navigation.navigate('OTPScreen', { phone: country.dial + phone })}>
                    <Text style={styles.buttonText}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default SignUpScreen;