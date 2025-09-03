import { StyleSheet } from "react-native";
import Fonts from "../../constants/font";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    // Đảm bảo content có thể scroll ngang
    minWidth: '100%',
  },
  filterText: {
    fontSize: 12,
    fontFamily: Fonts.Montserrat.Regular,
  },
  filterIcon: {
    marginRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  // Sort Buttons
  sortButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    flexShrink: 0,
  },
  activeSortButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  activeSortButtonText: {
    color: '#fff',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '125%',
    left: "32%",
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 4,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 9999,
    width: '42%',
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
    minHeight: 100,
  },
  optionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,

  },
  selectedOptionItem: {
    backgroundColor: '#fff',
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