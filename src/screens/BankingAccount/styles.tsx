import { StyleSheet } from "react-native";
import Fonts from "../../constants/font";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 30,
  },
  
  // Header
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
    fontSize: 16,
    fontFamily: Fonts.Montserrat.SemiBold,
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
  section: {
      backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    marginBottom: 20,
    borderRadius: 24,
  },
  // Title
  titleContainer: {
    // paddingHorizontal: 16,
    paddingVertical: 15,
  },
  pageTitle: {
    fontSize: 24,
   fontFamily: Fonts.DelaGothicOne
  },
  
  // Tabs
  tabContainer: {
    flexDirection: 'row',
    // paddingHorizontal: 16,
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F3F4F6',
  },
  tabButtonActive: {
    backgroundColor: '#374151',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  
  // Card Section
  cardSection: {
    // paddingHorizontal: 16,
  },
  
  // Credit Card
  creditCard: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 200,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 24,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardHolder: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  cardChip: {
    alignItems: 'flex-end',
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: '#FCD34D',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  
  // Card Pattern
  cardPattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  // Add Card Button
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#10B981',
    marginLeft: 8,
  },
  
  // Settings Section
  settingsSection: {
    // paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.DelaGothicOne,
    marginBottom: 16,
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    // paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingTitle: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  settingSeparator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: -16,
  },
});