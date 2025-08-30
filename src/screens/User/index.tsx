import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Calendar from '../../components/Calendar';
import { ScrollView } from 'react-native';
import BottomBar from '../../components/BottomBar';
import { Edit2, Profile, Setting } from 'iconsax-react-native';
import { Image } from 'react-native';
import { styles } from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

// Profile Card Component
const ProfileCard = () => {
    return (
        <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                    <Profile size="42" color="#028961" variant="Bold" />
                </View>
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Phương Trinh</Text>
                <Text style={styles.profileSubtext}>@thuytrinh21 • Đã tham gia từ 31 tháng 12, 2024</Text>
            </View>

            <TouchableOpacity style={styles.editButton}>
                <Edit2 width={20} height={20} color='white' />
                <Text style={styles.editButtonText}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>
        </View>
    );
};

// CO2 Stats Card Component
const CO2StatsCard = () => {
    return (
        <View style={styles.co2Card}>

            {/* <View style={styles.co2Header}>
                <Text style={styles.co2Title}>Bạn đã giảm thiểu</Text>
            </View>

            <View style={styles.co2Content}>
                <View style={styles.co2MainStat}>
                    <Text style={styles.co2Number}>5600</Text>
                    <Text style={styles.co2Unit}>CO2</Text>
                </View>
                <Text style={styles.co2Subtitle}>thải ra ngoài môi trường</Text>
                <View style={styles.co2Decoration}>
                    <View style={styles.cloudSmall} />
                    <View style={styles.cloudLarge} />
                    <View style={styles.flower1} />
                    <View style={styles.flower2} />
                </View>
            </View> */}
            <Image
                source={require('../../assets/images/banner_co2.png')}
                style={{ width: '100%', height: 200 }}
            />
        </View>
    );
};

// Achievement Stats Component
const AchievementStats = () => {
    return (
        <View style={styles.achievementContainer}>
            <Text style={styles.achievementTitle}>Thành tích</Text>

            <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                    <View style={styles.statIcon}>
                        <Image source={require('../../assets/icons/trophy.png')} style={{ width: 45, height: 45 }} />
                    </View>
                    <Text style={styles.statNumber}>3</Text>
                    <Text style={styles.statLabel}>Achievement</Text>
                </View>

                <View style={styles.statItem}>
                    <View style={styles.statIcon}>
                        <Image source={require('../../assets/icons/badge.png')} style={{ width: 45, height: 45 }} />
                    </View>
                    <Text style={styles.statNumber}>5</Text>
                    <Text style={styles.statLabel}>Mission completed</Text>
                </View>

                <View style={styles.statItem}>
                    <View style={styles.statIcon}>
                        <Image source={require('../../assets/icons/star.png')} style={{ width: 45, height: 45 }} />
                    </View>
                    <Text style={styles.statNumber}>1342</Text>
                    <Text style={styles.statLabel}>Total XP</Text>
                </View>

                <View style={styles.statItem}>
                    <View style={styles.statIcon}>
                        <Image source={require('../../assets/icons/silverRank.png')} style={{ width: 45, height: 45, resizeMode: 'contain' }} />
                    </View>
                    <Text style={styles.statNumber}>Silver</Text>
                    <Text style={styles.statLabel}>League</Text>
                </View>
            </View>
        </View>
    );
};

// Main UserScreen Component
const UserScreen = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('thang_nay');
    const [items, setItems] = useState([
        { label: 'Tháng này', value: 'thang_nay' },
        { label: 'Tháng 1', value: '1' },
        { label: 'Tháng 2 ', value: '2' },
        { label: 'Tháng 3 ', value: '3' },
        { label: 'Tháng 4 ', value: '4' },
        { label: 'Tháng 5 ', value: '5' },
        { label: 'Tháng 6 ', value: '6' },
        { label: 'Tháng 7 ', value: '7' },
        { label: 'Tháng 8 ', value: '8' },
        { label: 'Tháng 9 ', value: '9' },
        { label: 'Tháng 10 ', value: '10' },
        { label: 'Tháng 11 ', value: '11' },
        { label: 'Tháng 12 ', value: '12' },
    ]);


    const navigation = useNavigation<any>();
    return (
        <View style={styles.container}>
            <ScrollView scrollEnabled={!open} nestedScrollEnabled={true}>
                {/* Header Component */}
                <View style={styles.header}>
                    <View style={styles.headerBackground}>
                        <Image
                            source={require('../../assets/images/headerhome.png')}
                            style={styles.backgroundImage}
                        />
                    </View>
                    <View style={styles.headerContent}>
                        <TouchableOpacity style={styles.headerRight} onPressOut={() => {
                            navigation.navigate('Settings');
                        }}>
                            <Setting width={25} height={25} variant="Outline" />
                        </TouchableOpacity>
                    </View>
                </View>
                <ProfileCard />
                <CO2StatsCard />
                <AchievementStats />
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.title}>Chuỗi</Text>
                    <View>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder="Chọn tháng"
                            style={styles.dropdown}
                            textStyle={styles.dropdownText}
                            dropDownContainerStyle={styles.dropdownContainer}
                            arrowIconStyle={styles.arrowIcon}
                            tickIconStyle={styles.tickIcon}
                            listMode="SCROLLVIEW"
                        // scrollViewProps={{
                        //     nestedScrollEnabled: true,
                        // }}
                        />
                    </View>
                </View>
                <Calendar />
            </ScrollView>

            <BottomBar profile/>
        </View>
    );
};

export default UserScreen;

