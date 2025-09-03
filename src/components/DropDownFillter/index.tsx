import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { dropdownStyles } from './styles';

export interface DropdownItem {
  id: string;
  label: string;
  selected: boolean;
}

interface DropDownCustomProps {
  selectedItems: DropdownItem[];
  onItemsChange: (items: DropdownItem[]) => void;
  placeholder?: string;
  modalTitle?: string;
  confirmText?: string;
  options: { id: string; label: string }[];
}

const DropDownCustom: React.FC<DropDownCustomProps> = ({
  selectedItems,
  onItemsChange,
  placeholder = 'Chọn mục',
  modalTitle = 'Chọn mục',
  confirmText = 'Xác nhận',
  options
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleItem = (id: string) => {
    const updatedItems = selectedItems.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    onItemsChange(updatedItems);
  };

  const getSelectedCount = () => {
    return selectedItems.filter(item => item.selected).length;
  };

  const getDisplayText = () => {
    const count = getSelectedCount();
    if (count === 0) return placeholder;
    if (count === 1) {
      const selected = selectedItems.find(item => item.selected);
      return selected?.label || placeholder;
    }
    return `${count} mục đã chọn`;
  };

  const confirmSelection = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={dropdownStyles.dropdownContainer}>
      <TouchableOpacity
        style={dropdownStyles.dropdownButton}
        onPress={toggleDropdown}
      >
        <Text style={dropdownStyles.dropdownButtonText}>
          {getDisplayText()}
        </Text>
        <Icon 
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={20} 
          color="#666" 
        />
      </TouchableOpacity>

      {/* Dropdown Content */}
      
    </View>
  );
};

export default DropDownCustom;