import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { mockApiResponse } from './mockAPI';
// Cấu hình Mapbox Access Token
MapboxGL.setAccessToken('pk.eyJ1IjoibW9uc29vbjMxIiwiYSI6ImNtZXh1aXg3YzEzdWcyanNkb3dia3dhZmoifQ.FSm9TRxZuHn86G-R_uHmMQ');

// ---- Type Definitions ----
interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface Stop {
  name: string;
  latitude: number;
  longitude: number;
}

interface Station {
  name: string;
  latitude: number;
  longitude: number;
}

type SegmentType = "walking" | "bus" | "train";

interface Segment {
  id: number;
  type: SegmentType;
  duration: number;
  distance: number;
  instruction: string;
  startLocation: Location;
  endLocation: Location;
  coordinates: number[][]; // [longitude, latitude] format for Mapbox
  price?: number;
  busLine?: string;
  trainLine?: string;
  stops?: Stop[];
  stations?: Station[];
}

interface Route {
  id: number;
  totalDuration: number;
  totalDistance: number;
  totalPrice: number;
  startTime: string;
  endTime: string;
  segments: Segment[];
}

// ---- Component ----
const MultiStageRouting: React.FC = () => {
  const mapRef = useRef<MapboxGL.MapView>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<[number, number]>([105.8542, 21.0285]);

  // Fake API
  const fetchRoutesFromServer = async (startPoint: Location, endPoint: Location) => {
    try {
      setLoading(true);
      setTimeout(() => {
        setRoutes(mockApiResponse.routes as Route[]);
        setSelectedRoute(mockApiResponse.routes[0] as Route);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching routes:', error);
      Alert.alert('Lỗi', 'Không thể tải thông tin tuyến đường');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const startPoint = { latitude: 21.0285, longitude: 105.8542 };
    const endPoint = { latitude: 21.0155, longitude: 105.8102 };
    fetchRoutesFromServer(startPoint, endPoint);
  }, []);

  // Transport style
  const getTransportStyle = (type: SegmentType) => {
    switch(type) {
      case 'walking':
        return { color: '#4CAF50', icon: 'directions-walk', strokeWidth: 4 };
      case 'bus':
        return { color: '#81C784', icon: 'directions-bus', strokeWidth: 5 };
      case 'train':
        return { color: '#E91E63', icon: 'tram', strokeWidth: 6 };
      default:
        return { color: '#2196F3', icon: 'directions', strokeWidth: 4 };
    }
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes} phút`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}p`;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const selectRoute = (route: Route) => {
    setSelectedRoute(route);
    if (cameraRef.current && route.segments.length > 0) {
      const allCoordinates = route.segments.flatMap(seg => seg.coordinates);
      if (allCoordinates.length > 0) {
        const bounds = getBounds(allCoordinates);
        // Sử dụng setCamera với bounds
        cameraRef.current.setCamera({
          bounds: {
            ne: bounds.ne,
            sw: bounds.sw,
            paddingTop: 50,
            paddingRight: 50,
            paddingBottom: 250,
            paddingLeft: 50,
          },
          animationDuration: 1000,
        });
      }
    }
  };

  const getBounds = (coordinates: number[][]) => {
    let minLng = coordinates[0][0];
    let maxLng = coordinates[0][0];
    let minLat = coordinates[0][1];
    let maxLat = coordinates[0][1];

    coordinates.forEach(([lng, lat]) => {
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
    });

    return {
      sw: [minLng, minLat] as [number, number],
      ne: [maxLng, maxLat] as [number, number]
    };
  };

  const startNavigation = () => {
    if (selectedRoute) {
      Alert.alert(
        'Bắt đầu điều hướng',
        `Tuyến đường ${selectedRoute.segments.length} chặng\nThời gian: ${formatDuration(selectedRoute.totalDuration)}\nChi phí: ${formatPrice(selectedRoute.totalPrice)}`,
        [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Bắt đầu', onPress: () => console.log('Start navigation') }
        ]
      );
    }
  };

  const renderSegmentDetails = (segment: Segment, index: number) => {
    const style = getTransportStyle(segment.type);
    
    return (
      <View key={segment.id} style={styles.segmentItem}>
        <View style={styles.segmentHeader}>
          <View style={styles.segmentIconContainer}>
            <View style={[styles.segmentIconBg, { backgroundColor: style.color }]}>
              <Icon name={style.icon} size={20} color="#fff" />
            </View>
            <Text style={styles.segmentIndex}>{index + 1}</Text>
          </View>
          <View style={styles.segmentInfo}>
            <Text style={styles.segmentInstruction}>{segment.instruction}</Text>
            <View style={styles.segmentMeta}>
              <Text style={styles.segmentDuration}>
                {formatDuration(segment.duration)}
              </Text>
              <Text style={styles.segmentDistance}>
                • {segment.distance} km
              </Text>
              {segment.price && (
                <Text style={styles.segmentPrice}>
                  • {formatPrice(segment.price)}
                </Text>
              )}
            </View>
            {segment.busLine && (
              <Text style={styles.segmentLine}>
                Tuyến {segment.busLine}
              </Text>
            )}
            {segment.trainLine && (
              <Text style={styles.segmentLine}>
                Metro Line {segment.trainLine}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const onUserLocationUpdate = (location: MapboxGL.Location) => {
    if (location.coords) {
      setUserLocation([location.coords.longitude, location.coords.latitude]);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Đang tính toán tuyến đường...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tuyến đường đa chặng</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={() => {
          const startPoint = { latitude: 21.0285, longitude: 105.8542 };
          const endPoint = { latitude: 21.0155, longitude: 105.8102 };
          fetchRoutesFromServer(startPoint, endPoint);
        }}>
          <Icon name="refresh" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapboxGL.MapView
          ref={mapRef}
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Street}
        >
          <MapboxGL.Camera
            ref={cameraRef}
            zoomLevel={12}
            centerCoordinate={[105.8542, 21.0285]}
          />

          {/* User Location */}
          <MapboxGL.UserLocation
            visible={true}
            onUpdate={onUserLocationUpdate}
            showsUserHeadingIndicator={true}
          />

          {selectedRoute && selectedRoute.segments.map((segment, segmentIndex) => {
            const style = getTransportStyle(segment.type);
            
            return (
              <React.Fragment key={segment.id}>
                {/* Route Line */}
                <MapboxGL.ShapeSource
                  id={`route-${segment.id}`}
                  shape={{
                    type: 'Feature',
                    geometry: {
                      type: 'LineString',
                      coordinates: segment.coordinates
                    },
                    properties: {}
                  }}
                >
                  <MapboxGL.LineLayer
                    id={`route-line-${segment.id}`}
                    style={{
                      lineColor: style.color,
                      lineWidth: style.strokeWidth,
                      lineDasharray: segment.type === 'walking' ? [2, 2] : undefined,
                      lineCap: 'round',
                      lineJoin: 'round'
                    }}
                  />
                </MapboxGL.ShapeSource>
                
                {/* Start marker for first segment */}
                {segmentIndex === 0 && (
                  <MapboxGL.PointAnnotation
                    id="start-point"
                    coordinate={[segment.startLocation.longitude, segment.startLocation.latitude]}
                  >
                    <View style={styles.startMarker}>
                      <Icon name="my-location" size={16} color="#fff" />
                    </View>
                    <MapboxGL.Callout title="Điểm đầu" />
                  </MapboxGL.PointAnnotation>
                )}
                
                {/* End marker for last segment */}
                {segmentIndex === selectedRoute.segments.length - 1 && (
                  <MapboxGL.PointAnnotation
                    id="end-point"
                    coordinate={[segment.endLocation.longitude, segment.endLocation.latitude]}
                  >
                    <View style={styles.endMarker}>
                      <Icon name="place" size={16} color="#fff" />
                    </View>
                    <MapboxGL.Callout title="Điểm đến" />
                  </MapboxGL.PointAnnotation>
                )}
                
                {/* Transfer points */}
                {segmentIndex < selectedRoute.segments.length - 1 && (
                  <MapboxGL.PointAnnotation
                    id={`transfer-${segmentIndex}`}
                    coordinate={[segment.endLocation.longitude, segment.endLocation.latitude]}
                  >
                    <View style={[styles.transferMarker, { backgroundColor: style.color }]}>
                      <Icon name={style.icon} size={16} color="#fff" />
                    </View>
                    <MapboxGL.Callout title={`Điểm chuyển tiếp ${segmentIndex + 1}`} />
                  </MapboxGL.PointAnnotation>
                )}
                
                {/* Bus stops */}
                {segment.stops && segment.stops.map((stop, stopIndex) => (
                  <MapboxGL.PointAnnotation
                    key={`stop-${stopIndex}`}
                    id={`bus-stop-${segment.id}-${stopIndex}`}
                    coordinate={[stop.longitude, stop.latitude]}
                  >
                    <View style={styles.busStopMarker}>
                      <Icon name="directions-bus" size={12} color="#fff" />
                    </View>
                    <MapboxGL.Callout title={stop.name} />
                  </MapboxGL.PointAnnotation>
                ))}
                
                {/* Train stations */}
                {segment.stations && segment.stations.map((station, stationIndex) => (
                  <MapboxGL.PointAnnotation
                    key={`station-${stationIndex}`}
                    id={`train-station-${segment.id}-${stationIndex}`}
                    coordinate={[station.longitude, station.latitude]}
                  >
                    <View style={styles.trainStationMarker}>
                      <Icon name="tram" size={12} color="#fff" />
                    </View>
                    <MapboxGL.Callout title={station.name} />
                  </MapboxGL.PointAnnotation>
                ))}
              </React.Fragment>
            );
          })}
        </MapboxGL.MapView>

        {/* Map Controls */}
        <TouchableOpacity 
          style={styles.myLocationButton}
          onPress={() => {
            cameraRef.current?.setCamera({
              centerCoordinate: userLocation,
              zoomLevel: 15,
              animationDuration: 1000
            });
          }}
        >
          <Icon name="my-location" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Routes List */}
      <View style={styles.routesContainer}>
        <Text style={styles.routesTitle}>Các tuyến đường gợi ý</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {routes.map((route) => (
            <TouchableOpacity
              key={route.id}
              style={[
                styles.routeCard,
                selectedRoute?.id === route.id && styles.selectedRouteCard
              ]}
              onPress={() => selectRoute(route)}
            >
              <View style={styles.routeHeader}>
                <Text style={styles.routeDuration}>
                  {formatDuration(route.totalDuration)}
                </Text>
                <Text style={styles.routePrice}>
                  {formatPrice(route.totalPrice)}
                </Text>
              </View>
              
              <View style={styles.routeIcons}>
                {route.segments.map((segment, index) => {
                  const style = getTransportStyle(segment.type);
                  return (
                    <React.Fragment key={segment.id}>
                      <View style={[styles.miniIcon, { backgroundColor: style.color }]}>
                        <Icon name={style.icon} size={12} color="#fff" />
                      </View>
                      {index < route.segments.length - 1 && (
                        <Icon name="arrow-forward" size={12} color="#ccc" />
                      )}
                    </React.Fragment>
                  );
                })}
              </View>
              
              <Text style={styles.routeDistance}>
                {route.totalDistance} km • {route.segments.length} chặng
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Selected Route Details */}
        {selectedRoute && (
          <View style={styles.routeDetails}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.detailsTitle}>Chi tiết tuyến đường</Text>
              {selectedRoute.segments.map((segment, index) => 
                renderSegmentDetails(segment, index)
              )}
            </ScrollView>
          </View>
        )}

        {/* Navigation Button */}
        <TouchableOpacity 
          style={styles.navigationButton}
          onPress={startNavigation}
        >
          <Icon name="navigation" size={24} color="#fff" />
          <Text style={styles.navigationText}>Bắt đầu điều hướng</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MultiStageRouting;