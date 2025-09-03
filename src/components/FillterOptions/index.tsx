import { FunnelIcon } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Fonts from '../../constants/font';
import DropDownCustom, { DropdownItem } from '../DropDownFillter';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
interface RouteFilterProps {
  currentSort?: 'cheapest' | 'fastest' | 'greenest';
}

const FillterOptions: React.FC<RouteFilterProps> = ({
  currentSort = ''
}) => {
  // Transport options data
  const transportOptions = [
    { id: 'bus', label: 'Xe buýt' },
    { id: 'metro', label: 'Metro' },
    { id: 'bike', label: 'Xe đạp' },
    { id: 'walk', label: 'Đi bộ' }
  ];

  const [selectedTransports, setSelectedTransports] = useState<DropdownItem[]>([
    { id: 'bus', label: 'Xe buýt', selected: false },
    { id: 'metro', label: 'Metro', selected: false },
    { id: 'bike', label: 'Xe đạp', selected: false },
    { id: 'walk', label: 'Đi bộ', selected: false }
  ]);

  const [selectedSort, setSelectedSort] = useState(currentSort);

  const getSortButtonStyle = (type: string) => [
    styles.sortButton,
    selectedSort === type && styles.activeSortButton
  ];

  const getSortTextStyle = (type: string) => [
    styles.sortButtonText,
    selectedSort === type && styles.activeSortButtonText
  ];

  const sortOptions = [
    { key: 'greenest', label: 'Xanh nhất' },
    { key: 'cheapest', label: 'Rẻ nhất' },
    { key: 'fastest', label: 'Nhanh nhất' }
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = (id: string) => {
    const updatedItems = selectedTransports.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setSelectedTransports(updatedItems);
  };

  const getSelectedCount = () => {
    return selectedTransports.filter(item => item.selected).length;
  };

  const getDisplayText = () => {
    const count = getSelectedCount();
    if (count === 0) return 'Phương tiện';
    if (count === 1) {
      const selected = selectedTransports.find(item => item.selected);
      return selected?.label || 'Chọn mục';
    }
    return `${count} phương tiện`;
  };

  const confirmSelection = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.scrollContent}
      >
        {/* Filter Icon */}
        <View style={styles.filterIcon}>
          <FunnelIcon size={20} color="black" />
          <Text style={styles.filterText}>Lọc theo</Text>
        </View>

        {/* Dropdown */}

        {/* Sort Buttons */}
        <ScrollView horizontal contentContainerStyle={styles.sortButtonsContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={toggleDropdown}
          >
            <Text style={styles.dropdownButtonText}>
              {getDisplayText()}
            </Text>
            <Icon
              name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={getSortButtonStyle(option.key)}
              onPress={() => {
                setSelectedSort(prev => prev === option.key ? '' : option.key);
              }}
            >
              <Text style={getSortTextStyle(option.key)}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {isOpen && (
          <>
            {/* Invisible backdrop to close dropdown when tap outside */}
            {/* <Modal
            transparent
            visible={isOpen}
            animationType="none"
            onRequestClose={() => setIsOpen(false)}
          >
            <Pressable
              style={dropdownStyles.backdrop}
              onPress={() => setIsOpen(false)}
            />
          </Modal> */}

            {/* Dropdown Menu */}
            <View style={styles.dropdownMenu}>
              {/* Options List */}
              <View style={styles.optionsList}>
                {transportOptions.map((option) => {
                  const isSelected = selectedTransports.find(item => item.id === option.id)?.selected || false;
                  return (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.optionItem,
                        isSelected && styles.selectedOptionItem
                      ]}
                      onPress={() => toggleItem(option.id)}
                    >
                      <View style={styles.optionContent}>
                        <View style={[
                          styles.checkbox,
                          isSelected && styles.checkedBox
                        ]}>
                          {isSelected && (
                            <Icon name="check" size={14} color="#fff" />
                          )}
                        </View>
                        <Text style={[
                          styles.optionText,
                          isSelected && styles.selectedOptionText
                        ]}>
                          {option.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Confirm Button */}
              <View style={styles.dropdownFooter}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmSelection}
                >
                  <Text style={styles.confirmButtonText}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};



export default FillterOptions;