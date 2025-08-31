import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ActivityIndicator,
    Dimensions,
    Alert,
    Platform,
    StyleSheet,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { calculateDistance, getCategoryIcon, getPlaceCategory } from './ultis';
import { MAPBOX_ACCESS_TOKEN } from '../../utils/APIMapBox';
// Cấu hình Mapbox Access Token
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

type Location = {
    latitude: number;
    longitude: number;
    name?: string;
};

type Suggestion = {
    id: string | number;
    name: string;
    fullName: string;
    coordinates: [number, number];
    category: string;
    distance?: string | null;
};

const MapboxSearchScreen: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<Suggestion | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLocationLoading, setIsLocationLoading] = useState<boolean>(true);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    const mapRef = useRef<MapboxGL.MapView>(null);
    const cameraRef = useRef<MapboxGL.Camera>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const navigation = useNavigation<any>();

    const getCurrentLocation = () => {
        setIsLocationLoading(true);
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const location: Location = {
                    latitude,
                    longitude,
                    name: 'Vị trí hiện tại của bạn',
                };
                setCurrentLocation(location);
                setIsLocationLoading(false);

                if (cameraRef.current) {
                    cameraRef.current.setCamera({
                        centerCoordinate: [longitude, latitude],
                        zoomLevel: 15,
                        animationDuration: 1000,
                    });
                }
            },
            (error) => {
                console.log('Error getting location:', error);
                setIsLocationLoading(false);

                const defaultLocation: Location = {
                    latitude: 21.0285,
                    longitude: 105.8542,
                    name: 'Hà Nội, Việt Nam',
                };
                setCurrentLocation(defaultLocation);

                if (cameraRef.current) {
                    cameraRef.current.setCamera({
                        centerCoordinate: [defaultLocation.longitude, defaultLocation.latitude],
                        zoomLevel: 13,
                        animationDuration: 1000,
                    });
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            }
        );
    };

    // Tìm kiếm với Mapbox Geocoding API
    const searchPlaces = async (query: string) => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);

        try {
            const proximity = currentLocation
                ? `${currentLocation.longitude},${currentLocation.latitude}`
                : '105.8542,21.0285';

            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    query
                )}.json?` +
                `access_token=${MAPBOX_ACCESS_TOKEN}&` +
                `proximity=${proximity}&` +
                `country=VN&` +
                `limit=10&` +
                `language=vi`
            );

            const data = await response.json();

            if (data.features) {
                const formattedSuggestions: Suggestion[] = data.features.map(
                    (feature: any, index: number) => ({
                        id: feature.id || index,
                        name: feature.text || feature.place_name,
                        fullName: feature.place_name,
                        coordinates: feature.center,
                        category: getPlaceCategory(
                            feature.properties?.category || feature.place_type?.[0]
                        ),
                        distance: currentLocation
                            ? calculateDistance(
                                currentLocation.latitude,
                                currentLocation.longitude,
                                feature.center[1],
                                feature.center[0]
                            )
                            : null,
                    })
                );

                setSuggestions(formattedSuggestions);
            }
        } catch (error) {
            console.error('Search error:', error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Lấy vị trí hiện tại
    useEffect(() => {
        getCurrentLocation();
    }, []);

    // Debounced search
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            searchPlaces(searchText);
        }, 300);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchText, currentLocation]);
    
    // Chọn địa điểm
    const selectPlace = (place: Suggestion) => {
        setSelectedPlace(place);
        setSearchText(place.name);
        setSuggestions([]);
        setShowSuggestions(false);

        if (cameraRef.current && place.coordinates) {
            cameraRef.current.setCamera({
                centerCoordinate: place.coordinates,
                zoomLevel: 16,
                animationDuration: 1000,
            });
        }


        if (currentLocation) {
            navigation.navigate("RouteResult", {
                startPoint: {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                },
                endPoint: {
                    latitude: place.coordinates[1],
                    longitude: place.coordinates[0],
                },
                destinationName: place.name, 
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header với Search */}
            <View style={styles.searchContainer}>
                <View style={styles.searchHeader}>
                    <TouchableOpacity style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Bạn muốn đi đâu?</Text>
                </View>

                {/* Current Location */}
                <View style={styles.locationRow}>
                    <View style={styles.currentLocationDot} />
                    <TouchableOpacity
                        style={styles.currentLocationButton}
                        onPress={getCurrentLocation}
                    >
                        {isLocationLoading ? (
                            <ActivityIndicator size="small" color="#4CAF50" />
                        ) : (
                            <>
                                <Text style={styles.currentLocationText}>
                                    {currentLocation?.name || 'Đang lấy vị trí...'}
                                </Text>
                                <Icon name="my-location" size={16} color="#4CAF50" />
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Search Input */}
                <View style={styles.searchInputContainer}>
                    <View style={styles.destinationDot} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm địa điểm..."
                        value={searchText}
                        onChangeText={(text) => {
                            setSearchText(text);
                            setShowSuggestions(true);
                        }}
                        placeholderTextColor="#999"
                    />
                    {searchText.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={() => {
                                setSearchText('');
                                setSelectedPlace(null);
                                setSuggestions([]);
                            }}
                        >
                            <Icon name="close" size={20} color="#999" />
                        </TouchableOpacity>
                    )}
                    {isLoading && (
                        <ActivityIndicator size="small" color="#4CAF50" style={styles.loadingIcon} />
                    )}
                </View>

                {/* Suggestions */}
                {suggestions.length > 0 && (
                    <ScrollView
                        style={styles.suggestionsContainer}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {suggestions.map((suggestion) => (
                            <TouchableOpacity
                                key={suggestion.id}
                                style={styles.suggestionItem}
                                onPress={() => selectPlace(suggestion)}
                            >
                                <View style={styles.suggestionIcon}>
                                    <Icon
                                        name={getCategoryIcon(suggestion.category)}
                                        size={20}
                                        color="#666"
                                    />
                                </View>
                                <View style={styles.suggestionContent}>
                                    <Text style={styles.suggestionName}>{suggestion.name}</Text>
                                    <Text style={styles.suggestionAddress}>{suggestion.fullName}</Text>
                                    <View style={styles.suggestionMeta}>
                                        <Text style={styles.suggestionCategory}>{suggestion.category}</Text>
                                        {suggestion.distance && (
                                            <>
                                                <Text style={styles.suggestionDivider}> • </Text>
                                                <Text style={styles.suggestionDistance}>{suggestion.distance}</Text>
                                            </>
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
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
                        zoomLevel={13}
                        centerCoordinate={[105.8542, 21.0285]}
                    />

                    {/* User Location */}
                    <MapboxGL.UserLocation
                        visible={true}
                        showsUserHeadingIndicator={true}
                    />

                    {/* Current Location Marker */}
                    {currentLocation && (
                        <MapboxGL.PointAnnotation
                            id="current-location"
                            coordinate={[currentLocation.longitude, currentLocation.latitude]}
                        >
                            <View style={styles.currentLocationMarker}>
                                <Icon name="place" size={32} color="red" />
                            </View>
                            <MapboxGL.Callout title="Vị trí hiện tại" />
                        </MapboxGL.PointAnnotation>
                    )}

                    {/* Selected Place Marker */}
                    {selectedPlace && selectedPlace.coordinates && (
                        <MapboxGL.PointAnnotation
                            id="selected-place"
                            coordinate={selectedPlace.coordinates}
                        >
                            <View style={styles.selectedPlaceMarker}>
                                <Icon name="place" size={32} color="red" />
                            </View>
                            <MapboxGL.Callout title={selectedPlace.name} />
                        </MapboxGL.PointAnnotation>
                    )}
                </MapboxGL.MapView>

                {/* Map Controls */}
                <TouchableOpacity
                    style={styles.myLocationButton}
                    onPress={getCurrentLocation}
                >
                    <Icon name="my-location" size={24} color="#666" />
                </TouchableOpacity>
            </View>

            {/* Selected Place Info */}
            {/* {selectedPlace && (
                <View style={styles.selectedPlaceInfo}>
                    <View style={styles.placeInfoContent}>
                        <Icon
                            name={getCategoryIcon(selectedPlace.category)}
                            size={24}
                            color="#4CAF50"
                        />
                        <View style={styles.placeInfoText}>
                            <Text style={styles.placeInfoName}>{selectedPlace.name}</Text>
                            <Text style={styles.placeInfoAddress}>{selectedPlace.fullName}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.directionsButton}>
                        <Icon name="directions" size={20} color="#4CAF50" />
                        <Text style={styles.directionsText}>Chỉ đường</Text>
                    </TouchableOpacity>
                </View>
            )} */}


        </SafeAreaView>
    );
};



export default MapboxSearchScreen;