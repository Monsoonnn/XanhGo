import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  backButton: {
    padding: 8,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  
  refreshButton: {
    padding: 8,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  
  // Mapbox Markers
  startMarker: {
    width: 32,
    height: 32,
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  
  endMarker: {
    width: 32,
    height: 32,
    backgroundColor: '#F44336',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
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
  
  navigationButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  
  navigationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});