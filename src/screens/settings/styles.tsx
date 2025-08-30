import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 30,
    paddingBottom: 80,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  moreButton: {
    padding: 8,
    marginRight: -8,
  },
  
  // ScrollView
  scrollView: {
    flex: 1,
  },
  
  // Settings Section
  settingsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    marginBottom: 10,
    borderRadius: 24,
  },
  sectionMargin: {
    marginTop: 8,
  },
  
  // Settings Item
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    minHeight: 56,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingsItemText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '400',
  },
  
  // Separator
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 56, 
  },
});
