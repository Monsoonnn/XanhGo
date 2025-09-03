import { StyleSheet, Dimensions } from 'react-native';
import Fonts from '../../constants/font';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // Map Preview Container
  mapPreviewContainer: {
    height: height * 0.3, // 30% của màn hình
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },

  mapPreview: {
    flex: 1,
  },

  // Header với subtitle
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },

  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  // Routes Selection Container
  routesSelectionContainer: {
    flex: 1,
    // backgroundColor: 'f',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  routesSelectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },

  routesScrollView: {
    marginBottom: 20,
  },

  // Route Selection Card
  routeSelectionCard: {
    backgroundColor: '#FAFDF3',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    
    borderWidth: 2,
    borderColor: 'transparent',
  },

  selectedRouteSelectionCard: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },

  routeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  routeCardLeft: {
    flex: 1,
  },

  routeCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  recommendedBadge: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },

  routeCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },

  routeCardMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  routeCardTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeCardTime: {
    fontSize: 16,
    fontFamily: Fonts.Montserrat.SemiBold
  },

  routeCardDistance: {
    fontSize: 16,
    marginLeft: 4,
    fontFamily: Fonts.DelaGothicOne
  },

  routeCardPrice: {
    fontSize: 14,
    fontFamily: Fonts.Montserrat.Regular,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  routeCardEmmision: {
    fontSize: 10,
    fontFamily: Fonts.Montserrat.Regular,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#29B26B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    color: '#fff'
  },
  routeCardTransports: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  transportIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },

  segmentsCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },

  selectedIndicator: {
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },

  // Route Card Details
  routeCardDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

  segmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  segmentDetailIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  segmentDetailText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },

  // Navigation Container
  navigationContainer: {
    paddingBottom: 20,
  },

  startNavigationButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,

  },

  disabledButton: {
    backgroundColor: '#ccc',
  },

  startNavigationText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: '#fff',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 13,

  },
  currentLocationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D4D4D4',
    marginRight: 16,
  },
  locationContainer: {
    margin: 12, 
    marginBottom: 0,
    backgroundColor: '#fff',
  },
  currentLocationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#D4D4D4',

  },
  currentLocationText: {
    fontSize: 14,
    fontFamily: Fonts.Montserrat.Regular,
    // color: '#4CAF50',
    fontWeight: '500',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },

  backButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: -5,
  },

  headerTitle: {
    fontSize: 24,
    fontFamily: Fonts.DelaGothicOne,
    textAlign: 'center',
    marginLeft: -25,
  },

  refreshButton: {
    padding: 8,
    borderRadius: 8,
  },

  startMarker: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  endMarker: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navigationButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
  },

  navigationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  mapContainer: {
    flex: 1,
    position: 'relative',
  },

  map: {
    flex: 1,
  },

  myLocationButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 3,
  },

  transferMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },

  busStopMarker: {
    width: 20,
    height: 20,
    backgroundColor: '#81C784',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },

  trainStationMarker: {
    width: 20,
    height: 20,
    backgroundColor: '#E91E63',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },

  routesContainer: {
    backgroundColor: '#fff',
    paddingTop: 16,
    maxHeight: height * 0.5,
  },

  routesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
    color: '#000',
  },

  routeCard: {
    backgroundColor: '#f8f9fa',
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    minWidth: 160,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  selectedRouteCard: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4CAF50',
  },

  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  routeDuration: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  routePrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },

  routeIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  miniIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },

  routeDistance: {
    fontSize: 12,
    color: '#666',
  },

  routeDetails: {
    maxHeight: 200,
    marginTop: 8,
    paddingHorizontal: 16,
  },

  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },

  segmentItem: {
    marginBottom: 16,
  },

  segmentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  segmentIconContainer: {
    alignItems: 'center',
    marginRight: 12,
  },

  segmentIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  segmentIndex: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  segmentInfo: {
    flex: 1,
  },

  segmentInstruction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },

  segmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  segmentDuration: {
    fontSize: 12,
    color: '#666',
  },

  segmentDistance: {
    fontSize: 12,
    color: '#666',
  },

  segmentPrice: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },

  segmentLine: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '600',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
});

// Merge với styles hiện tại
