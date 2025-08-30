import { useRef, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Switch,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import { BottomSheetRef } from '../../components/BottomSheet';
import { AddCardBottomSheet } from './addCard';
import { useNavigation } from '@react-navigation/native';
import SuccesModel from '../../components/SucccesModel';
import { AddEBankingBottomSheet } from './addEBanking';
import { AddPhysicCardBottomSheet } from './addPhysicCard';
type TabButtonProps = {
    title: string;
    isActive: boolean;
    onPress: () => void;
};

const TabButton = ({ title, isActive, onPress }: TabButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.tabButton,
                isActive && styles.tabButtonActive
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[
                styles.tabButtonText,
                isActive && styles.tabButtonTextActive
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

type CreditCardProps = {
    cardName: string;
    cardNumber: string;
    holderName: string;
    cardType: string;
};

// const CreditCard = ({ cardName, cardNumber, holderName, cardType }: CreditCardProps) => {
//   return (
//     <View style={styles.creditCard}>
//       {/* Card Header */}
//       <View style={styles.cardHeader}>
//         <Text style={styles.cardName}>{cardName}</Text>
//         <Text style={styles.cardType}>{cardType}</Text>
//       </View>

//       {/* Card Number */}
//       <Text style={styles.cardNumber}>{cardNumber}</Text>

//       {/* Card Footer */}
//       <View style={styles.cardFooter}>
//         <Text style={styles.cardHolder}>{holderName}</Text>
//         <View style={styles.cardChip}>
//           {/* Chip icon */}
//           <View style={styles.chip} />
//         </View>
//       </View>

//       {/* Decorative elements */}
//       <View style={styles.cardPattern}>
//         <View style={[styles.circle, { top: -20, right: -20 }]} />
//         <View style={[styles.circle, { bottom: -30, right: 40, opacity: 0.3 }]} />
//       </View>
//     </View>
//   );
// };

type AddCardButtonProps = {
    onPress: () => void;
};

const AddCardButton = ({ onPress }: AddCardButtonProps) => {
    return (
        <TouchableOpacity
            style={styles.addCardButton}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Icon name="plus" size={20} color="#10B981" />
            <Text style={styles.addCardText}>Thêm thẻ mới</Text>
        </TouchableOpacity>
    );
};

type SettingItemProps = {
    title: string;
    isEnabled: boolean;
    onToggle: (value: boolean) => void;
};

const SettingItem = ({ title, isEnabled, onToggle }: SettingItemProps) => {
    return (
        <View style={styles.settingItem}>
            <Text style={styles.settingTitle}>{title}</Text>
            <Switch
                value={isEnabled}
                onValueChange={onToggle}
                trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#D1D5DB"
            />
        </View>
    );
};

const BankingAccountScreen = () => {
    const navigation = useNavigation<any>();

    const [activeTab, setActiveTab] = useState('Ví điện tử');
    const [contactlessPayment, setContactlessPayment] = useState(true);
    const [onlinePayment, setOnlinePayment] = useState(false);

    const addCardRef = useRef<BottomSheetRef>(null);
    const addEBankingRef = useRef<BottomSheetRef>(null);
    const addPhysicCardRef = useRef<BottomSheetRef>(null);
    const [visibleModel, setVisibleModel] = useState(false);

    // Handle thêm ví điện tử
    const handleAddCard = () => {
        addCardRef.current?.open();
    };

    // Handle thêm tài khoản e-banking
    const handleAddEBank = () => {
        addEBankingRef.current?.open();
    };

    // Handle thêm thẻ vật lí
    const handlePhysicCard = () => {
        console.log("Thêm thẻ vật lí");
        addPhysicCardRef.current?.open();
    };

    // Submit ví điện tử
    const handlePhoneSubmit = (phoneNumber: string) => {
        console.log('Phone:', phoneNumber);
        addCardRef.current?.close();
        setVisibleModel(true);
    };

    // Submit tài khoản e-banking
    const handleEBankingSubmit = (data: { bank: string; accountName: string; accountNumber: string; }) => {
        console.log('Banking Information:', data.bank, data.accountName, data.accountNumber);
        addEBankingRef.current?.close();
        setVisibleModel(true);
    };

    const handlePhysicCardSubmit = (data: {
        cardNumber: string;
        holderName: string;
        cvv: string;
        expiry: string;
    }) => {
        console.log('Physic card:', data);
        addPhysicCardRef.current?.close();
        setVisibleModel(true);
    };

    const tabs = ['Ví điện tử', 'Thẻ vật lí', 'Tài khoản'];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPressOut={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color="#374151" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Tài khoản</Text>

                <TouchableOpacity style={styles.moreButton}>
                    <Icon name="more-horizontal" size={24} color="#374151" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Page Title */}
                <View style={styles.section}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.pageTitle}>Tài khoản của tôi</Text>
                    </View>

                    {/* Tab Navigation */}
                    <View style={styles.tabContainer}>
                        {tabs.map((tab) => (
                            <TabButton
                                key={tab}
                                title={tab}
                                isActive={activeTab === tab}
                                onPress={() => setActiveTab(tab)}
                            />
                        ))}
                    </View>

                    {/* Card Section */}
                    <View style={styles.cardSection}>
                        <Image
                            source={require('../../assets/images/credit_card.png')}
                            style={{ width: '100%', height: 200, resizeMode: 'stretch' }}
                        />
                        {activeTab === 'Ví điện tử' && (
                            <AddCardButton onPress={handleAddCard} />
                        )}
                        {activeTab === 'Thẻ vật lí' && (
                            <AddCardButton onPress={handlePhysicCard} />
                        )}
                        {activeTab === 'Tài khoản' && (
                            <AddCardButton onPress={handleAddEBank} />
                        )}
                    </View>
                </View>

                {/* Settings Section */}
                <View style={styles.section}>
                    <View style={styles.settingsSection}>
                        <Text style={styles.sectionTitle}>Cài đặt thẻ</Text>

                        <View style={styles.settingsContainer}>
                            <SettingItem
                                title="Thanh toán không chạm"
                                isEnabled={contactlessPayment}
                                onToggle={setContactlessPayment}
                            />

                            <View style={styles.settingSeparator} />

                            <SettingItem
                                title="Thanh toán online"
                                isEnabled={onlinePayment}
                                onToggle={setOnlinePayment}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Sheets */}
            <AddCardBottomSheet
                ref={addCardRef}
                onSubmit={handlePhoneSubmit}
                onClose={() => console.log('Sheet closed')}
            />
            <AddEBankingBottomSheet
                ref={addEBankingRef}
                onSubmit={handleEBankingSubmit}
                onClose={() => console.log('Sheet closed')}
            />
            <AddPhysicCardBottomSheet
                ref={addPhysicCardRef}
                onSubmit={handlePhysicCardSubmit}
                onClose={() => console.log('Physic card sheet closed')}
            />
            {/* Success Model */}
            <SuccesModel
                visible={visibleModel}
                onClose={() => setVisibleModel(false)}
                message="Liên kết hoàn tất!"
                imageSource={require("../../assets/icons/succes_check.png")}
            />
        </SafeAreaView>
    );
};

export default BankingAccountScreen;


