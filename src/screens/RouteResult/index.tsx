import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
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
  getTimeRangeString,
  getTransportIcon,
  calculateRouteGreenPoints,
  calculateTotalEmission,
} from '../../utils/Mapbox.tsx';
import { fetchFakeRoutesFromServer, MAPBOX_ACCESS_TOKEN } from '../../utils/APIMapBox.tsx';
import { RootStackParamList } from '../../navigation/MapNavigation.tsx';
import SearchBar from '../../components/SearchBar/index.tsx';
import DropDownFillter from '../../components/FillterOptions/index.tsx';
import FillterOptions from '../../components/FillterOptions/index.tsx';
import DropDownCustom, { DropdownItem } from '../../components/DropDownFillter/index.tsx';
import { DotIcon } from 'phosphor-react-native';
import Fonts from '../../constants/font.js';
import { ArrowLeft2 } from 'iconsax-react-native';

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
  const { startPoint, endPoint, startPointName, destinationName } = params;
  const navigation = useNavigation<any>();

  const [searchText, setSearchText] = useState<string>(destinationName || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  useEffect(() => {
    const loadRoutes = async () => {
      setLoading(true);
      // console.log("startPoint:", startPoint, "\n endPoint:", endPoint, "destinationName:", destinationName);
      const result = await fetchFakeRoutesFromServer(startPoint, endPoint);
      if (result && result.length > 0) {
        setRoutes(result);
        // setSelectedRoute(result[0]);
        setUserLocation([startPoint.longitude, startPoint.latitude]);


        setTimeout(() => {
          if (result[0].segments.length > 0) {
            // selectRouteAndZoom(result[0]);
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

  const startNavigation = (route: Route) => {

    setSelectedRoute(route);

    if (selectedRoute) {
      navigation.navigate("MapNavigation", {
        startPoint,
        endPoint,
        selectedRouteProps: selectedRoute,
      });
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Đang tìm kiếm tuyến đường tốt nhất...</Text>
        </View>
      </View>
    );
  }

  if (routes.length === 0) {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <ArrowLeft2
            size="24"
          // color="#FF8A65"
          />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Kết quả</Text>
        </View>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>
      <View style={[styles.locationContainer, { backgroundColor: 'white' }]}  >
        <View style={styles.locationRow}>
          <View style={styles.currentLocationDot} />
          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={() => { navigation.goBack() }}
          >

            <Text style={styles.currentLocationText}>
              {startPointName || 'Vị trí hiện tại'}
            </Text>
            <Icon name="my-location" size={16} color="black" />
          </TouchableOpacity>
        </View>

        {/* Search  */}
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            onClear={() => navigation.goBack()}
            loading={isLoading}
          />
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
      <FillterOptions />

      <View style={styles.routesSelectionContainer}>
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
              onPress={() => {
                // selectRouteAndZoom(route), 
                startNavigation(route)
              }}
            >
              <View style={styles.routeCardHeader}>
                <View style={styles.routeCardLeft}>
                  <View style={styles.routeCardTimeContainer}>
                    <Text style={styles.routeCardTime}>{formatDuration(route.totalDuration)}</Text>
                    <DotIcon />
                    <Text style={{ fontFamily: Fonts.Montserrat.Regular, fontSize: 14 }}>{getTimeRangeString(route.totalDuration)} </Text>
                  </View>
                  {/* <Text style={styles.routeCardTitle}>
                    Tuyến đường {index + 1}
                    {index === 0 && <Text style={styles.recommendedBadge}> • Đề xuất</Text>}
                  </Text> */}

                  {/* <View style={styles.routeCardMeta}>
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
                  </View> */}

                  <View style={styles.routeCardTransports}>
                    {route.segments.map((segment, segIndex) => {
                      const style = getTransportStyle(segment.type);
                      return (
                        <React.Fragment key={segment.id}>
                          <Image
                            source={getTransportIcon(segment.type)}
                            style={{ width: 28, height: 28, marginVertical: 10 }}
                            resizeMode="contain"
                          />
                          {segIndex < route.segments.length - 1 && (
                            <Icon name="chevron-right" size={16} color="#ccc" />
                          )}
                        </React.Fragment>
                      );
                    })}
                    {/* <Text style={styles.segmentsCount}>
                      {route.segments.length} chặng
                    </Text> */}
                  </View>
                  <Text style={{ marginTop: 10, fontFamily: Fonts.Montserrat.Medium, fontSize: 14, color: '#525252' }}> Sẽ đến trong vài phút nữa</Text>
                </View>
                <View style={styles.selectedIndicator}>
                  <Text style={styles.routeCardPrice}>{formatPrice(route.totalPrice)}</Text>
                  <Text style={styles.routeCardEmmision}>{calculateTotalEmission(route)}g CO2</Text>
                  <Text style={styles.routeCardDistance}>
                    {route.totalDistance} km
                  </Text>
                </View>
                {/* {selectedRoute?.id === route.id && (
                  <View style={styles.selectedIndicator}>
                    <Icon name="check-circle" size={24} color="#4CAF50" />
                  </View>
                )} */}


              </View>

              {/* {selectedRoute?.id === route.id && (
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
              )} */}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* <View style={styles.navigationContainer}>
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
        </View> */}
      </View>
    </View>
  );
};

export default RouteSelectionScreen;