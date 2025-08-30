import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import { FolderConnection, Gift, I24Support, Location, Profile, Ranking, Setting } from 'iconsax-react-native';
type SettingsItemProps = {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  showArrow?: boolean;
};

const SettingsItem = ({ icon, title, onPress, showArrow = true }: SettingsItemProps) => {
  return (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingsItemLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <Text style={styles.settingsItemText}>{title}</Text>
      </View>

      {showArrow && (
        <Icon name="chevron-right" size={24} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );
};

type SettingsSectionProps = {
  children: React.ReactNode;
  style?: any;
};

const SettingsSection = ({ children, style }: SettingsSectionProps) => {
  return (
    <View style={[styles.settingsSection, style]}>
      {children}
    </View>
  );
};

const SettingsScreen = () => {

  const navigation = useNavigation<any>();

  const handlePersonalInfo = () => {
    console.log('Navigate to Personal Info');
  };

  const handleAccount = () => {
    navigation.navigate('BankingAccount');
  };

  const handleSavedAddresses = () => {
    console.log('Navigate to Saved Addresses');
  };

  const handleMyRewards = () => {
    console.log('Navigate to My Rewards');
  };

  const handleSupportCenter = () => {
    console.log('Navigate to Support Center');
  };

  const handleRateApp = () => {
    console.log('Rate App');
  };

  const handleSettings = () => {
    console.log('Navigate to App Settings');
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPressOut={
          () => navigation.goBack()
        }>
          <Icon name="chevron-left" size={24} color="#374151" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cài đặt</Text>

        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more-horizontal" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* User Settings Section */}
        <SettingsSection style={{}}>
          <SettingsItem
            icon={<Profile size={24} color="#6B7280" />}
            title="Thông tin cá nhân"
            onPress={handlePersonalInfo}
          />

          <View style={styles.separator} />

          <SettingsItem
            icon={<FolderConnection size={24} color="#6B7280" />}
            title="Tài khoản"
            onPress={handleAccount}
          />

          <View style={styles.separator} />

          <SettingsItem
            icon={<Location size={24} color="#6B7280" />}
            title="Địa chỉ đã lưu"
            onPress={handleSavedAddresses}
          />
        </SettingsSection>

        {/* App Settings Section */}
        <SettingsSection style={styles.sectionMargin}>
          <SettingsItem
            icon={<Gift size={24} color="#6B7280" />}
            title="Phần quà của tôi"
            onPress={handleMyRewards}
          />

          <View style={styles.separator} />

          <SettingsItem
            icon={<I24Support size={24} color="#6B7280" />}
            title="Trung tâm hỗ trợ"
            onPress={handleSupportCenter}
          />

          <View style={styles.separator} />

          <SettingsItem
            icon={<Ranking size={24} color="#6B7280" />}
            title="Rate app"
            onPress={handleRateApp}
          />

          <View style={styles.separator} />

          <SettingsItem
            icon={<Setting size={24} color="#6B7280" />}
            title="Cài đặt"
            onPress={handleSettings}
          />
        </SettingsSection>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;



export { SettingsItem, SettingsSection };