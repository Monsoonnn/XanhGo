import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/Feather';
import BottomSheet, { BottomSheetRef } from '../../components/BottomSheet';
import { ArrowRight2 } from 'iconsax-react-native';

const { height: screenHeight } = Dimensions.get('window');
// Add Card Bottom Sheet Component
interface AddCardBottomSheetProps {
  onSubmit?: (phoneNumber: string) => void;
  onClose?: () => void;
}

export const AddCardBottomSheet = forwardRef<BottomSheetRef, AddCardBottomSheetProps>(
  ({ onSubmit, onClose }, ref) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [allowPermission, setAllowPermission] = useState(false);
    
    const handleSubmit = () => {
      if (phoneNumber && allowPermission) {
        onSubmit?.(phoneNumber);
        // Reset form
        setPhoneNumber('');
        setAllowPermission(false);

      }
    };

    return (
      <BottomSheet
        ref={ref}
        title="Thêm ví điện tử"
        adjustToContentHeight
        onClose={onClose}
      >
        {/* Phone Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Số điện thoại</Text>
          
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCode}>
              <View style={styles.vietnamFlag}>
                <Image source={require('../../assets/icons/vietnam.png')} style={{}} />
              </View>
              <Text style={styles.countryCodeText}>+84</Text>
              <Icon name="chevron-down" size={16} color="#6B7280" />
            </View>
            
            <TextInput
              style={styles.phoneInput}
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#9CA3AF"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        
        {/* Permission Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => setAllowPermission(!allowPermission)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, allowPermission && styles.checkboxActive]}>
            {allowPermission && (
              <Icon name="check" size={14} color="#FFFFFF" />
            )}
          </View>
          <Text style={styles.checkboxText}>
            Cho phép quyền truy cập ứng dụng
          </Text>
        </TouchableOpacity>
        
        {/* Continue Button */}
        <TouchableOpacity 
          style={[
            styles.continueButton,
            (!phoneNumber || !allowPermission) && styles.continueButtonDisabled
          ]}
          onPressOut={handleSubmit}
          disabled={!phoneNumber || !allowPermission}
        >
          <ArrowRight2 size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </BottomSheet>
    );
  }
);
const styles = StyleSheet.create({
  // Base BottomSheet Styles
  
  // Add Card Specific Styles
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 12,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  vietnamFlag: {
    width: 20,
    height: 14,
    marginRight: 8,
    borderRadius: 2,
    marginTop: -5,
  },
  flagStripe: {
    flex: 1,
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
    color: '#374151',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkboxText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
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
  
  // Example Styles
  exampleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  exampleButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  exampleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});