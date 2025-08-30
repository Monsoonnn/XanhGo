import { forwardRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import BottomSheet, { BottomSheetRef } from '../../components/BottomSheet';
import { ArrowRight2 } from 'iconsax-react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface AddEBankingBottomSheetProps {
    onSubmit?: (data: {
        bank: string;
        accountName: string;
        accountNumber: string;
    }) => void;
    onClose?: () => void;
}

export const AddEBankingBottomSheet = forwardRef<BottomSheetRef, AddEBankingBottomSheetProps>(
    ({ onSubmit, onClose }, ref) => {

        const [open, setOpen] = useState(false);
        const [selectedBank, setSelectedBank] = useState<string | null>(null);

        // Danh sách ngân hàng mẫu
        const [banks, setBanks] = useState([
            { label: 'Vietcombank', value: 'vietcombank' },
            { label: 'VietinBank', value: 'vietinbank' },
            { label: 'Techcombank', value: 'techcombank' },
            { label: 'MB Bank', value: 'mbbank' },
            { label: 'ACB', value: 'acb' },
            { label: 'Sacombank', value: 'sacombank' },
        ]);

        const [accountName, setAccountName] = useState('');
        const [accountNumber, setAccountNumber] = useState('');

        const handleSubmit = () => {
            if (selectedBank && accountName && accountNumber) {
                onSubmit?.({
                    bank: selectedBank,
                    accountName,
                    accountNumber,
                });
                // Reset form
                setSelectedBank(null);
                setAccountName('');
                setAccountNumber('');
            }
        };

        const isDisabled = !selectedBank || !accountName || !accountNumber;

        return (
            <BottomSheet
                ref={ref}
                title="Thêm E-Banking"
                adjustToContentHeight
                onClose={onClose}
            >
                <Text style={styles.label}>Chọn ngân hàng</Text>
                <View style={styles.inputWrapper}>
                    <DropDownPicker
                        open={open}
                        value={selectedBank}
                        items={banks}
                        setOpen={setOpen}
                        setValue={setSelectedBank}
                        setItems={setBanks}
                        placeholder="Chọn ngân hàng"
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        dropDownContainerStyle={styles.dropdownContainer}
                        arrowIconStyle={styles.arrowIcon}
                        tickIconStyle={styles.tickIcon}
                        listMode="SCROLLVIEW"
                    />
                </View>

                <Text style={styles.label}>Tên tài khoản</Text>
                <TextInput
                    style={styles.input}
                    value={accountName}
                    onChangeText={setAccountName}
                    placeholder="Nhập tên tài khoản"
                />

                <Text style={styles.label}>Số tài khoản</Text>
                <TextInput
                    style={styles.input}
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                    placeholder="Nhập số tài khoản"
                    keyboardType="numeric"
                />

                {/* Continue Button */}
                <TouchableOpacity
                    style={[styles.continueButton, isDisabled && styles.continueButtonDisabled]}
                    onPressOut={handleSubmit}
                    disabled={isDisabled}
                >
                    <ArrowRight2 size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </BottomSheet>
        );
    }
);

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 10,
        marginBottom: 4,
        color: '#374151',
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    continueButton: {
        width: 56,
        height: 56,
        backgroundColor: 'black',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    continueButtonDisabled: {
        backgroundColor: '#D1D5DB',
    },
    dropdown: {
        backgroundColor: 'white',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 8,
        minHeight: 40,
        width: '100%',
    },
    dropdownText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    dropdownContainer: {
        backgroundColor: 'white',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 8,
        maxHeight: 200,
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
    tickIcon: {
        width: 16,
        height: 16,
    },
});
