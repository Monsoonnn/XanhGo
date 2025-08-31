import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import {
  Location,
  Route,
  Segment,
  getTransportStyle,
  formatDuration,
  formatPrice,
  getBounds,
} from '../../utils/Mapbox.tsx';
import { fetchFakeRoutesFromServer, MAPBOX_ACCESS_TOKEN } from '../../utils/APIMapBox.tsx';
import { RootStackParamList } from '../../navigation/MapNavigation.tsx';

// Cấu hình Mapbox Access Token
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

type RouteSelectionRouteProp = RouteProp<RootStackParamList, "RouteSelectionScreen">;

const RouteSelectionScreen: React.FC = () => {
  const mapRef = useRef<MapboxGL.MapView>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  
  const { params } = useRoute<RouteSelectionRouteProp>();
  const { startPoint, endPoint, destinationName } = params;


  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadRoutes = async () => {
      setLoading(true);
      // console.log("startPoint:", startPoint, "\n endPoint:", endPoint, "destinationName:", destinationName);
      const result = await fetchFakeRoutesFromServer(startPoint, endPoint);
      if (result && result.length > 0) {
        setRoutes(result);
        setSelectedRoute(result[0]);
        setUserLocation([startPoint.longitude, startPoint.latitude]);
        
        
        setTimeout(() => {
          if (result[0].segments.length > 0) {
            selectRouteAndZoom(result[0]);
          }
        }, 500);
      }
      setLoading(false);
    //   console.log("routes:", result);
    };
    loadRoutes();
  }, [startPoint, endPoint]);

  const selectRouteAndZoom = (route: Route) => {
    setSelectedRoute(route);
    if (cameraRef.current && route.segments.length > 0) {
      const allCoordinates = route.segments.flatMap(seg => seg.coordinates);
      if (allCoordinates.length > 0) {
        const bounds = getBounds(allCoordinates);
        cameraRef.current.setCamera({
          bounds: {
            ne: bounds.ne,
            sw: bounds.sw,
            paddingTop: 50,
            paddingRight: 50,
            paddingBottom: 200,
            paddingLeft: 50,
          },
          animationDuration: 1000,
        });
      }
    }
  };

  const startNavigation = () => {
    if (selectedRoute) {
      navigation.navigate("MultiStageRouting", {
        startPoint,
        endPoint,
        selectedRoute, // Truyền route đã chọn
      });
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Đang tìm kiếm tuyến đường tốt nhất...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (routes.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Không tìm thấy tuyến đường</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Icon name="error-outline" size={64} color="#ccc" />
          <Text style={styles.loadingText}>Không tìm thấy tuyến đường phù hợp</Text>
          <TouchableOpacity style={styles.navigationButton} onPress={goBack}>
            <Text style={styles.navigationText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Chọn tuyến đường</Text>
          <Text style={styles.headerSubtitle}>
            Đến: {destinationName || 'Điểm đến'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={async () => {
            setLoading(true);
            const newRoutes = await fetchFakeRoutesFromServer(startPoint, endPoint);
            if (newRoutes && newRoutes.length > 0) {
              setRoutes(newRoutes);
              setSelectedRoute(newRoutes[0]);
              selectRouteAndZoom(newRoutes[0]);
            }
            setLoading(false);
          }}
        >
          <Icon name="refresh" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Map Preview */}
      {/* <View style={styles.mapPreviewContainer}>
        <MapboxGL.MapView
          ref={mapRef}
          style={styles.mapPreview}
          styleURL={MapboxGL.StyleURL.Street}
        >
          <MapboxGL.Camera
            ref={cameraRef}
            zoomLevel={12}
            centerCoordinate={[
              (startPoint.longitude + endPoint.longitude) / 2,
              (startPoint.latitude + endPoint.latitude) / 2
            ]}
          />

          {selectedRoute && selectedRoute.segments.map((segment, segmentIndex) => {
            const style = getTransportStyle(segment.type);
            return (
              <React.Fragment key={segment.id}>
                
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

                
                {segmentIndex === 0 && (
                  <MapboxGL.PointAnnotation
                    id="start-point"
                    coordinate={[segment.startLocation.longitude, segment.startLocation.latitude]}
                  >
                    <View style={styles.startMarker}>
                      <Icon name="place" size={24} color="#4CAF50" />
                    </View>
                  </MapboxGL.PointAnnotation>
                )}

                
                {segmentIndex === selectedRoute.segments.length - 1 && (
                  <MapboxGL.PointAnnotation
                    id="end-point"
                    coordinate={[segment.endLocation.longitude, segment.endLocation.latitude]}
                  >
                    <View style={styles.endMarker}>
                      <Icon name="place" size={24} color="#FF5722" />
                    </View>
                  </MapboxGL.PointAnnotation>
                )}
              </React.Fragment>
            );
          })}
        </MapboxGL.MapView>
      </View> */}

      {/* Routes List */}
      <View style={styles.routesSelectionContainer}>
        <Text style={styles.routesSelectionTitle}>
          Tìm thấy {routes.length} tuyến đường
        </Text>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={styles.routesScrollView}
        >
          {routes.map((route, index) => (
            <TouchableOpacity
              key={route.id}
              style={[
                styles.routeSelectionCard,
                selectedRoute?.id === route.id && styles.selectedRouteSelectionCard
              ]}
              onPress={() => selectRouteAndZoom(route)}
            >
              <View style={styles.routeCardHeader}>
                <View style={styles.routeCardLeft}>
                  <Text style={styles.routeCardTitle}>
                    Tuyến đường {index + 1}
                    {index === 0 && <Text style={styles.recommendedBadge}> • Đề xuất</Text>}
                  </Text>
                  
                  <View style={styles.routeCardMeta}>
                    <View style={styles.routeCardMetaItem}>
                      <Icon name="schedule" size={16} color="#666" />
                      <Text style={styles.routeCardTime}>
                        {formatDuration(route.totalDuration)}
                      </Text>
                    </View>
                    
                    <View style={styles.routeCardMetaItem}>
                      <Icon name="straighten" size={16} color="#666" />
                      <Text style={styles.routeCardDistance}>
                        {route.totalDistance} km
                      </Text>
                    </View>
                    
                    <View style={styles.routeCardMetaItem}>
                      <Icon name="attach-money" size={16} color="#666" />
                      <Text style={styles.routeCardPrice}>
                        {formatPrice(route.totalPrice)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.routeCardTransports}>
                    {route.segments.map((segment, segIndex) => {
                      const style = getTransportStyle(segment.type);
                      return (
                        <React.Fragment key={segment.id}>
                          <View style={[styles.transportIcon, { backgroundColor: style.color }]}>
                            <Icon name={style.icon} size={14} color="#fff" />
                          </View>
                          {segIndex < route.segments.length - 1 && (
                            <Icon name="chevron-right" size={16} color="#ccc" />
                          )}
                        </React.Fragment>
                      );
                    })}
                    <Text style={styles.segmentsCount}>
                      {route.segments.length} chặng
                    </Text>
                  </View>
                </View>

                {selectedRoute?.id === route.id && (
                  <View style={styles.selectedIndicator}>
                    <Icon name="check-circle" size={24} color="#4CAF50" />
                  </View>
                )}
              </View>

              {/* Detailed segments - show only for selected route */}
              {selectedRoute?.id === route.id && (
                <View style={styles.routeCardDetails}>
                  {route.segments.map((segment, segIndex) => {
                    const style = getTransportStyle(segment.type);
                    return (
                      <View key={segment.id} style={styles.segmentDetail}>
                        <View style={[styles.segmentDetailIcon, { backgroundColor: style.color }]}>
                          <Icon name={style.icon} size={12} color="#fff" />
                        </View>
                        <Text style={styles.segmentDetailText}>
                          {segment.instruction} • {formatDuration(segment.duration)}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Start Navigation Button */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[
              styles.startNavigationButton,
              !selectedRoute && styles.disabledButton
            ]}
            onPress={startNavigation}
            disabled={!selectedRoute}
          >
            <Icon name="navigation" size={24} color="#fff" />
            <Text style={styles.startNavigationText}>Bắt đầu điều hướng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RouteSelectionScreen;