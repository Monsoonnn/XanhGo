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
import { styles } from './styles';
import {
  Location,
  Route,
  Segment,
  SegmentType,
  getTransportStyle,
  formatDuration,
  formatPrice,
  getBounds,
  generateRandomSegments,
  getTransportIcon
} from '../../utils/Mapbox.tsx';
import { fetchFakeRoutesFromServer, MAPBOX_ACCESS_TOKEN } from '../../utils/APIMapBox.tsx';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/MapNavigation.tsx';
import { ArrowLeft2 } from 'iconsax-react-native';
import { BottomSheetRef } from '../../components/BottomSheet/index.tsx';
import NavigationBottomSheet from '../../components/RouteDetails/index.tsx';
import { Image } from 'react-native';
import SuccesModel from '../../components/SucccesModel/index.tsx';
import Fonts from '../../constants/font.js';


// Cấu hình Mapbox Access Token
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

type MultiStageRoutingRouteProp = RouteProp<RootStackParamList, "MapNavigation">;

const MapNavigation: React.FC = () => {
  const mapRef = useRef<MapboxGL.MapView>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);
  const navigationBottomSheetRef = useRef<BottomSheetRef>(null);

  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  const [navigationStatus, setNavigationStatus] = useState<"idle" | "navigating" | "done">("idle");
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState<number>(0);
  const [visibleModel, setVisibleModel] = useState<boolean>(false);


  const { params } = useRoute<MultiStageRoutingRouteProp>();
  const { startPoint, endPoint, selectedRouteProps: passedRoute } = params;
  const navigation = useNavigation<any>();


  useEffect(() => {
    const loadRoutes = async () => {
      setLoading(true);

      if (passedRoute) {
        setRoutes([passedRoute]);
        setSelectedRoute(passedRoute);
        setUserLocation([startPoint.longitude, startPoint.latitude]);

        // Auto zoom to selected route and open bottom sheet
        if (passedRoute.segments.length > 0) {
          setTimeout(() => {
            const allCoordinates = passedRoute.segments.flatMap((seg: Segment) => seg.coordinates);
            if (allCoordinates.length > 0 && cameraRef.current) {
              const bounds = getBounds(allCoordinates);
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
            // Open navigation bottom sheet
            setTimeout(() => {
              navigationBottomSheetRef.current?.open();
            }, 1000);
          }, 500);
        }
      } else {
        // Fallback: load routes fake nếu không có selectedRoute
        // const result = await fetchFakeRoutesFromServer(startPoint, endPoint);
        // if (result) {
        //   setRoutes(result);
        //   setSelectedRoute(result[0]);
        //   setUserLocation([startPoint.longitude, startPoint.latitude]);
        // }
      }

      setLoading(false);
    };

    loadRoutes();
  }, [passedRoute, startPoint, endPoint]);

  const selectRoute = (route: Route) => {
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
            paddingBottom: 250,
            paddingLeft: 50,
          },
          animationDuration: 1000,
        });
      }
    }
  };

  const handleStartNavigation = () => {
    if (selectedRoute) {
      if (navigationStatus === "navigating") {
        // Stop navigation
        setNavigationStatus('done');
        setCurrentSegmentIndex(0);
        console.log('Navigation stopped');
      } else {
        // Start navigation
        setNavigationStatus('navigating');
        setCurrentSegmentIndex(0); // Start with first segment

        // Zoom to first segment
        if (selectedRoute.segments.length > 0) {
          const firstSegment = selectedRoute.segments[0];
          cameraRef.current?.setCamera({
            centerCoordinate: [firstSegment.startLocation.longitude, firstSegment.startLocation.latitude],
            zoomLevel: 16,
            animationDuration: 1000
          });
        }
      }
    }
  };

  const onUserLocationUpdate = (location: MapboxGL.Location) => {
    if (location.coords) {
      setUserLocation([location.coords.longitude, location.coords.latitude]);
    }
  };

  const headerTitle = passedRoute ? 'Điều hướng' : 'Tuyến đường đa chặng';

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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft2 size={24} color="#000" />
        </TouchableOpacity>

        {/* Chỉ hiển thị refresh button khi không có passedRoute và không đang navigation */}
        {/* {!passedRoute && !isNavigating && (
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={async () => {
              const newRoutes = await fetchFakeRoutesFromServer(startPoint, endPoint);
              if (newRoutes) {
                setRoutes(newRoutes);
              }
            }}
          >
            <Icon name="refresh" size={24} color="#000" />
          </TouchableOpacity>
        )} */}
        {/* Nếu có passedRoute hoặc đang navigation, để trống để header cân đối */}
        {/* {(passedRoute || isNavigating) && <View style={styles.refreshButton} />} */}
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapboxGL.MapView
          ref={mapRef}
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Street}
          logoEnabled={false}
          compassEnabled={true}
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
            const isCurrentSegment = navigationStatus === 'navigating' && segmentIndex === currentSegmentIndex;

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
                      lineWidth: isCurrentSegment ? style.strokeWidth + 2 : style.strokeWidth,
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
                      <Icon name="place" size={32} color="red" />
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
                      <Icon name="place" size={32} color="red" />
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
                    <View style={[
                      styles.transferMarker,
                      { backgroundColor: isCurrentSegment ? '#FF5722' : style.color }
                    ]}>
                      <Image source={getTransportIcon(segment.type)} style={{ width: 28, height: 28 }} />
                    </View>
                    <MapboxGL.Callout title={`Điểm chuyển tiếp ${segmentIndex + 1}`} />
                  </MapboxGL.PointAnnotation>
                )}

                {/* Bus stops */}
                {/* {segment.stops && segment.stops.map((stop, stopIndex) => (
                  <MapboxGL.PointAnnotation
                    key={`stop-${stopIndex}`}
                    id={`bus-stop-${segment.id}-${stopIndex}`}
                    coordinate={[stop.longitude, stop.latitude]}
                  >
                    <View style={styles.busStopMarker}>
                      <Image source={getTransportIcon(segment.type)} />
                    </View>
                    <MapboxGL.Callout title={stop.name} />
                  </MapboxGL.PointAnnotation>
                ))} */}

                {/* Train stations */}
                {/* {segment.stations && segment.stations.map((station, stationIndex) => (
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
                ))} */}
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

        {/* Routes Toggle Button - Show when there's a selected route */}
        {selectedRoute && (
          <TouchableOpacity
            style={[
              styles.routesToggleButton,
              navigationStatus === 'navigating' && styles.navigationToggleButton
            ]}
            onPress={() => navigationBottomSheetRef.current?.open()}
          >
            <Icon
              name={navigationStatus === 'navigating' ? "navigation" : "list"}
              size={24}
              color="#fff"
            />
            <Text style={styles.routesToggleText}>
              {navigationStatus === 'navigating' ? 'Xem điều hướng' : (passedRoute ? 'Xem hướng dẫn' : 'Xem tuyến đường')}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Routes List - Only show when not navigating and no passedRoute */}
      {!passedRoute && navigationStatus === 'idle' && (
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
        </View>
      )}

      {/* Navigation Bottom Sheet */}
      <NavigationBottomSheet
        ref={navigationBottomSheetRef}
        selectedRoute={selectedRoute}
        passedRoute={passedRoute}
        navigationStatus={navigationStatus}
        currentSegmentIndex={currentSegmentIndex}
        onStartNavigation={handleStartNavigation}
        onCloseModel={() => setVisibleModel(true)}
      />
      <SuccesModel
        visible={visibleModel}
        onClose={() => setVisibleModel(false)}
        message="Bạn đã thành công điểm danh ngày hôm nay"
        imageSource={require("../../assets/images/celebrate.png")}
        imageStyle={{ width: "100%", height: 120, marginBottom: 20 }}
      >
        <TouchableOpacity style={{ marginTop: 12, paddingHorizontal: 40, paddingVertical: 15, backgroundColor: "#028961", borderRadius: 32 }}
          onPress={() => { setVisibleModel(false), setNavigationStatus('idle'), setCurrentSegmentIndex(0); }}
        >
          <Text style={{ color: "#fff", fontFamily: Fonts.Montserrat.Medium, fontSize: 14 }}>Đã nhận 30 điểm xanh</Text>
        </TouchableOpacity>
      </SuccesModel>
    </SafeAreaView>
  );
};

export default MapNavigation;