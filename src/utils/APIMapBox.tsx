import { Alert } from "react-native";
import { Route, Location, generateRandomSegments } from "./Mapbox";

export const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibW9uc29vbjMxIiwiYSI6ImNtZXh1aXg3YzEzdWcyanNkb3dia3dhZmoifQ.FSm9TRxZuHn86G-R_uHmMQ";

export const fetchFakeRoutesFromServer = async (
  startPoint: Location,
  endPoint: Location
): Promise<Route[] | null> => {
  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint.longitude},${startPoint.latitude};${endPoint.longitude},${endPoint.latitude}?geometries=geojson&alternatives=true&steps=true&access_token=${MAPBOX_ACCESS_TOKEN}`;

    const response = await fetch(url);
    const data = await response.json();

    //console.log("data:", data);


    if (!data.routes || data.routes.length === 0) {
      Alert.alert("Lỗi", "Không tìm thấy tuyến đường nào");
      return null;
    }

    // Map Mapbox routes to custom Route[]
    const mappedRoutes: Route[] = data.routes.map((route: any, idx: number) => {
      const coords = route.geometry.coordinates;
      const totalDuration = Math.round(route.duration / 60);
      const totalDistance = parseFloat((route.distance / 1000).toFixed(1));

      const segments = generateRandomSegments(
        coords,
        startPoint,
        endPoint,
        totalDuration,
        totalDistance
      );

      const totalPrice = segments.reduce(
        (sum, segment) => sum + (segment.price || 0),
        0
      );

      return {
        id: idx + 1,
        totalDuration,
        totalDistance,
        totalPrice,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + route.duration * 1000).toISOString(),
        segments,
      };
    });

    return mappedRoutes;
  } catch (error) {
    console.error("Error fetching routes:", error);
    Alert.alert("Lỗi", "Không thể tải tuyến đường từ Mapbox");
    return null;
  }
};
