import { forwardRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native';
import { BottomSheetRef } from '../../components/BottomSheet';
import BottomSheet from '../../components/BottomSheet';

interface AddPhysicCardBottomSheetProps {
    onSubmit?: (data: {
        cardNumber: string;
        holderName: string;
        cvv: string;
        expiry: string;
    }) => void;
    onClose?: () => void;
}

export const AddPhysicCardBottomSheet = forwardRef<
    BottomSheetRef,
    AddPhysicCardBottomSheetProps
>(({ onSubmit, onClose }, ref) => {
    const [step, setStep] = useState<1 | 2>(1);

    const [cardNumber, setCardNumber] = useState('');
    const [holderName, setHolderName] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiry, setExpiry] = useState('');

    const handleSubmit = () => {
        if (!cardNumber.trim() || !holderName.trim() || !cvv.trim() || !expiry.trim()) {
            console.warn("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        onSubmit?.({ cardNumber, holderName, cvv, expiry });
        setCardNumber('');
        setHolderName('');
        setCvv('');
        setExpiry('');
        setStep(1); // reset về bước 1 khi đóng
    };

    return (
        <BottomSheet
            ref={ref}
            title="Thêm thẻ vật lí"
            adjustToContentHeight
            onClose={() => {
                setStep(1); // reset về bước scan khi đóng
                onClose?.();
            }}
        >
            {step === 1 ? (
                <View style={styles.step1}>
                    <Text style={styles.scanText}>Quá trình scan sẽ bắt đầu tự động</Text>
                    <View style={styles.scanBox}>
                        <Image
                            source={require('../../assets/images/Scan.png')}
                            style={{ width: '100%', resizeMode: 'contain' }}
                        />
                    </View>
                    <Text style={styles.note}>Cần thẻ ở trong khung quét</Text>
                    <TouchableOpacity
                        style={styles.manualButton}
                        onPress={() => setStep(2)}
                    >
                        <Text style={styles.manualButtonText}>Thêm thủ công</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    {/* Preview card */}
                    <View style={styles.previewCard}>
                        <Image
                            source={require('../../assets/images/credit_card.png')}
                            style={{ width: '100%', height: 120, resizeMode: 'contain' }}
                        />
                    </View>

                    {/* Inputs */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Số thẻ</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập số thẻ"
                            keyboardType="numeric"
                            value={cardNumber}
                            onChangeText={setCardNumber}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Tên chủ sở hữu thẻ</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập tên"
                            value={holderName}
                            onChangeText={setHolderName}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                            <Text style={styles.label}>CVV</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="***"
                                keyboardType="numeric"
                                value={cvv}
                                onChangeText={setCvv}
                                secureTextEntry
                            />
                        </View>
                        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                            <Text style={styles.label}>Ngày hết hạn</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="MM/YY"
                                value={expiry}
                                onChangeText={setExpiry}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            !(cardNumber && holderName && cvv && expiry) && styles.submitButtonDisabled,
                        ]}
                        disabled={!(cardNumber && holderName && cvv && expiry)}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitText}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            )}
        </BottomSheet>
    );
});

const styles = StyleSheet.create({
    step1: {
        alignItems: 'center',
        paddingBottom: 16,
    },
    scanText: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 16,
    },
    scanBox: {
        width: '80%',
        marginBottom: 16,
    },
    note: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 24,
    },
    manualButton: {
        backgroundColor: '#10B981',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 32,
    },
    manualButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    previewCard: {
        marginBottom: 24,
        alignItems: 'center',
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        fontSize: 16,
        backgroundColor: '#F9FAFB',
        color: '#111827',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    submitButton: {
        backgroundColor: '#10B981',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    submitButtonDisabled: {
        backgroundColor: '#D1D5DB',
    },
    submitText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
