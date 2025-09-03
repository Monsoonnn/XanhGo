import { StyleSheet, Dimensions } from 'react-native';
import Fonts from '../../constants/font';

const { height: screenHeight } = Dimensions.get('window');

export const dropdownStyles = StyleSheet.create({
  // Main Container
  dropdownContainer: {
    zIndex: 1000,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 3,
    minWidth: 150,
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.Montserrat.Regular,
    color: '#333',
  },

  // Backdrop for closing dropdown
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Dropdown Menu
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 4,
    maxHeight: 400,
    elevation: 8, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 9999,
  },

  // Dropdown Header
  dropdownHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownTitle: {
    fontSize: 16,
    fontFamily: Fonts.Montserrat.Medium,
    color: '#333',
  },

  // Options List
  optionsList: {
    maxHeight: 200,
  },
  optionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  selectedOptionItem: {
    backgroundColor: '#f0f8f0',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Checkbox
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },

  // Option Text
  optionText: {
    fontSize: 14,
    fontFamily: Fonts.Montserrat.Regular,
    flex: 1,
  },
  selectedOptionText: {
    color: '#4CAF50',
    fontWeight: '500',
  },

  // Dropdown Footer
  dropdownFooter: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 14,
    fontFamily: Fonts.Montserrat.Medium,
    color: '#fff',
  },
});