// utils.ts
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
}

export interface Stop {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Station {
  name: string;
  latitude: number;
  longitude: number;
}

export type SegmentType = "walking" | "bus" | "train" | "bicycle";

export interface Segment {
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

export interface Route {
  id: number;
  totalDuration: number;
  totalDistance: number;
  totalPrice: number;
  startTime: string;
  endTime: string;
  segments: Segment[];
}

// Transport style configuration
export const getTransportStyle = (type: SegmentType) => {
  switch (type) {
    case 'walking':
      return { color: '#EFEAD6', icon: 'directions-walk', strokeWidth: 4 };
    case 'bus':
      return { color: '#BEDEAB', icon: 'directions-bus', strokeWidth: 5 };
    case 'train':
      return { color: '#F6B9D4', icon: 'tram', strokeWidth: 6 };
    case 'bicycle':
      return { color: '#29B26B', icon: 'directions-bike', strokeWidth: 4 };
    default:
      return { color: '#2196F3', icon: 'directions', strokeWidth: 4 };
  }
};


export const getTransportIcon = (type: string) => {
  switch (type) {
    case "bus":
      return require("../assets/icons/bus.png");
    case "walking":
      return require("../assets/icons/walk.png");
    case "train":
      return require("../assets/icons/tram.png");
    case "bicycle":
      return require("../assets/icons/bicycle.png");
    default:
      // return require("../assets/icons/default.png");
  }
};

export const getNavigationIcon = (type: string) => {
  switch (type) {
    case "bus":
      return require("../assets/navigationIcon/bus.png");
    case "walking":
      return require("../assets/navigationIcon/walk.png");
    case "train":
      return require("../assets/navigationIcon/tram.png");
    case "bicycle":
      return require("../assets/navigationIcon/bicycle.png");
    default:
      return require("../assets/navigationIcon/default.png");
      // return require("../assets/icons/default.png");
  }
};


// Format duration in minutes to readable string
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} phút`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}p`;
};

export function formatDistance(distance: number): string {
  if (distance < 1000) {
    return `${distance.toFixed(0)} m`;
  } else if (distance < 1000000) {
    return `${(distance / 1000).toFixed(1)} km`;
  } else {
    return `${(distance / 1000000).toFixed(1)} Mm`; 
  }
}

export const getTimeRangeString = (minutes: number): string => {
  const now = new Date();
  const future = new Date(now.getTime() + minutes * 60000);

  const format = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const mins = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${mins}`;
  };

  return `${format(now)} - ${format(future)}`;
};


// Format price to Vietnamese currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};



// Calculate bounds from coordinates array
export const getBounds = (coordinates: number[][]) => {
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

// Calculate distance between two points (Haversine formula)
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Split coordinates into segments based on distance or count
export const splitCoordinatesIntoSegments = (coordinates: number[][], maxSegments: number = 4): number[][][] => {
  if (coordinates.length < 2) return [coordinates];
  
  // Ensure we have at least 3 segments for 3 transport types
  const minSegments = 3;
  const actualMaxSegments = Math.max(minSegments, maxSegments);
  const segmentCount = Math.min(actualMaxSegments, Math.max(minSegments, Math.floor(coordinates.length / 8)));
  
  const segmentLength = Math.max(1, Math.floor(coordinates.length / segmentCount));
  const segments: number[][][] = [];
  
  for (let i = 0; i < segmentCount; i++) {
    const start = i * segmentLength;
    let end: number;
    
    if (i === segmentCount - 1) {
      // Last segment takes all remaining coordinates
      end = coordinates.length;
    } else {
      end = Math.min(start + segmentLength + 1, coordinates.length);
    }
    
    const segment = coordinates.slice(start, end);
    
    if (segment.length >= 2) {
      segments.push(segment);
    }
  }
  
  // Ensure we have at least minSegments
  if (segments.length < minSegments && coordinates.length >= minSegments * 2) {
    // Redistribute coordinates more evenly
    const redistributedSegments: number[][][] = [];
    const newSegmentLength = Math.floor(coordinates.length / minSegments);
    
    for (let i = 0; i < minSegments; i++) {
      const start = i * newSegmentLength;
      const end = i === minSegments - 1 ? coordinates.length : Math.min((i + 1) * newSegmentLength + 1, coordinates.length);
      const segment = coordinates.slice(start, end);
      
      if (segment.length >= 2) {
        redistributedSegments.push(segment);
      }
    }
    
    return redistributedSegments.length >= minSegments ? redistributedSegments : segments;
  }
  
  return segments;
};

// Generate random transport type based on distance and position
const getRandomTransportType = (distance: number, segmentIndex: number, totalSegments: number): SegmentType => {
  const transportTypes: SegmentType[] = ['walking', 'bus', 'train'];
  
  // For 3 segments, try to distribute evenly
  if (totalSegments === 3) {
    if (segmentIndex === 0) return Math.random() < 0.5 ? 'walking' : 'bus';
    if (segmentIndex === 1) return Math.random() < 0.6 ? 'train' : 'bus';
    return Math.random() < 0.5 ? 'walking' : 'train';
  }
  
  // First and last segments prefer walking, but not exclusively
  if (segmentIndex === 0) {
    return Math.random() < 0.6 ? 'walking' : (Math.random() < 0.5 ? 'bus' : 'train');
  }
  
  if (segmentIndex === totalSegments - 1) {
    return Math.random() < 0.6 ? 'walking' : (Math.random() < 0.5 ? 'bus' : 'train');
  }
  
  // Middle segments: distribute based on distance and randomness
  if (distance < 0.5) {
    return Math.random() < 0.7 ? 'walking' : (Math.random() < 0.5 ? 'bus' : 'train');
  } else if (distance < 2) {
    const rand = Math.random();
    if (rand < 0.4) return 'bus';
    if (rand < 0.7) return 'walking';
    return 'train';
  } else {
    const rand = Math.random();
    if (rand < 0.5) return 'train';
    if (rand < 0.8) return 'bus';
    return 'walking';
  }
};

// Generate random bus line
const getRandomBusLine = (): string => {
  const busLines = ['01', '02', '03', '05', '06', '07', '08', '09', '14', '18', '22', '25', '32', '34', '49', '103', '121'];
  return busLines[Math.floor(Math.random() * busLines.length)];
};

// Generate random train line
const getRandomTrainLine = (): string => {
  const trainLines = ['2A', '3'];
  return trainLines[Math.floor(Math.random() * trainLines.length)];
};

// Generate instruction based on transport type
const generateInstruction = (type: SegmentType, busLine?: string, trainLine?: string): string => {
  switch (type) {
    case 'walking':
      const walkInstructions = [
        'Đi bộ theo chỉ dẫn',
        'Tiếp tục di chuyển',
        'Đi bộ tới điểm kế tiếp',
        'Tiếp tục đi bộ'
      ];
      return walkInstructions[Math.floor(Math.random() * walkInstructions.length)];
    case 'bus':
      return `Đi xe buýt tuyến ${busLine}`;
    case 'train':
      return `Đi tàu metro tuyến ${trainLine}`;
    default:
      return 'Di chuyển theo hướng dẫn';
  }
};

// Calculate price based on transport type and distance
const calculatePrice = (type: SegmentType, distance: number): number => {
  switch (type) {
    case 'walking':
      return 0;
    case 'bus':
      return distance < 10 ? 7000 : 8000; // VND
    case 'train':
      return distance < 5 ? 8000 : (distance < 10 ? 12000 : 15000); // VND
    default:
      return 0;
  }
};

// Generate mock stops for bus segments
const generateMockStops = (coordinates: number[][], type: SegmentType): Stop[] | undefined => {
  if (type !== 'bus' || coordinates.length < 3) return undefined;
  
  const stops: Stop[] = [];
  const stopNames = [
    'Bến xe buýt Hàng Xanh', 'Trạm Ngã Tư Sở', 'Bến xe Mỹ Đình',
    'Trạm Đại học Quốc gia', 'Bến xe Giáp Bát', 'Trạm Bưu điện Hà Nội',
    'Trạm Chợ Đồng Xuân', 'Bến xe Nước Ngầm', 'Trạm Hoàng Kiếm'
  ];
  
  // Add 2-4 stops along the route
  const numStops = Math.min(4, Math.max(2, Math.floor(coordinates.length / 3)));
  const stepSize = Math.floor(coordinates.length / (numStops + 1));
  
  for (let i = 1; i <= numStops; i++) {
    const coordIndex = Math.min(i * stepSize, coordinates.length - 2);
    const coord = coordinates[coordIndex];
    stops.push({
      name: stopNames[Math.floor(Math.random() * stopNames.length)],
      longitude: coord[0],
      latitude: coord[1]
    });
  }
  
  return stops;
};

// Generate mock stations for train segments
const generateMockStations = (coordinates: number[][], type: SegmentType): Station[] | undefined => {
  if (type !== 'train' || coordinates.length < 3) return undefined;
  
  const stations: Station[] = [];
  const stationNames = [
    'Ga Hà Nội', 'Ga Long Biên', 'Ga Phố Nối', 'Ga Đông Anh',
    'Ga Sóc Sơn', 'Ga Gia Lâm', 'Ga Yên Viên', 'Metro Cát Linh',
    'Metro La Thành', 'Metro Thái Hà'
  ];
  
  // Add 1-3 stations along the route
  const numStations = Math.min(3, Math.max(1, Math.floor(coordinates.length / 5)));
  const stepSize = Math.floor(coordinates.length / (numStations + 1));
  
  for (let i = 1; i <= numStations; i++) {
    const coordIndex = Math.min(i * stepSize, coordinates.length - 2);
    const coord = coordinates[coordIndex];
    stations.push({
      name: stationNames[Math.floor(Math.random() * stationNames.length)],
      longitude: coord[0],
      latitude: coord[1]
    });
  }
  
  return stations;
};

// Ensure all transport types are included
const ensureAllTransportTypes = (segments: Segment[]): Segment[] => {
  const transportTypes: SegmentType[] = ['walking', 'bus', 'train'];
  const usedTypes = new Set(segments.map(seg => seg.type));
  const missingTypes = transportTypes.filter(type => !usedTypes.has(type));
  
  if (missingTypes.length === 0) {
    return segments;
  }
  
  // Modify some segments to include missing transport types
  const modifiableSegments = segments.filter((seg, index) => 
    index > 0 && index < segments.length - 1 // Don't modify first and last segments
  );
  
  missingTypes.forEach(missingType => {
    if (modifiableSegments.length > 0) {
      const randomIndex = Math.floor(Math.random() * modifiableSegments.length);
      const segmentToModify = modifiableSegments[randomIndex];
      const originalIndex = segments.findIndex(seg => seg.id === segmentToModify.id);
      
      if (originalIndex !== -1) {
        const busLine = missingType === 'bus' ? getRandomBusLine() : undefined;
        const trainLine = missingType === 'train' ? getRandomTrainLine() : undefined;
        
        segments[originalIndex] = {
          ...segments[originalIndex],
          type: missingType,
          instruction: generateInstruction(missingType, busLine, trainLine),
          price: calculatePrice(missingType, segments[originalIndex].distance),
          busLine,
          trainLine,
          stops: generateMockStops(segments[originalIndex].coordinates, missingType),
          stations: generateMockStations(segments[originalIndex].coordinates, missingType)
        };
        
        // Remove from modifiable list to avoid duplicate modifications
        const modifiableIndex = modifiableSegments.findIndex(seg => seg.id === segmentToModify.id);
        if (modifiableIndex !== -1) {
          modifiableSegments.splice(modifiableIndex, 1);
        }
      }
    }
  });
  
  return segments;
};

// Main function to generate random segments from coordinates
export const generateRandomSegments = (
  coordinates: number[][],
  startPoint: Location,
  endPoint: Location,
  totalDuration: number,
  totalDistance: number
): Segment[] => {
  if (coordinates.length < 2) {
    return [{
      id: 1,
      type: 'walking',
      duration: totalDuration,
      distance: totalDistance,
      instruction: 'Đi bộ theo tuyến đường',
      startLocation: startPoint,
      endLocation: endPoint,
      coordinates: coordinates,
      price: 0
    }];
  }

  // Split coordinates into at least 3 segments to accommodate all transport types
  const minSegments = 3; // Ensure we have at least 3 segments for 3 transport types
  const maxSegments = Math.min(5, Math.max(minSegments, Math.floor(coordinates.length / 8)));
  const coordinateSegments = splitCoordinatesIntoSegments(coordinates, maxSegments);
  
  const segments: Segment[] = [];
  
  coordinateSegments.forEach((segmentCoords, index) => {
    const segmentDistance = segmentCoords.reduce((total, coord, i) => {
      if (i === 0) return total;
      const prevCoord = segmentCoords[i - 1];
      return total + calculateDistance(prevCoord[1], prevCoord[0], coord[1], coord[0]);
    }, 0);
    
    const segmentDuration = Math.round((segmentDistance / totalDistance) * totalDuration);
    const transportType = getRandomTransportType(segmentDistance, index, coordinateSegments.length);
    
    const busLine = transportType === 'bus' ? getRandomBusLine() : undefined;
    const trainLine = transportType === 'train' ? getRandomTrainLine() : undefined;
    
    const segmentStart: Location = index === 0 ? startPoint : {
      latitude: segmentCoords[0][1],
      longitude: segmentCoords[0][0]
    };
    
    const segmentEnd: Location = index === coordinateSegments.length - 1 ? endPoint : {
      latitude: segmentCoords[segmentCoords.length - 1][1],
      longitude: segmentCoords[segmentCoords.length - 1][0]
    };
    
    segments.push({
      id: index + 1,
      type: transportType,
      duration: segmentDuration,
      distance: parseFloat(segmentDistance.toFixed(1)),
      instruction: generateInstruction(transportType, busLine, trainLine),
      startLocation: segmentStart,
      endLocation: segmentEnd,
      coordinates: segmentCoords,
      price: calculatePrice(transportType, segmentDistance),
      busLine,
      trainLine,
      stops: generateMockStops(segmentCoords, transportType),
      stations: generateMockStations(segmentCoords, transportType)
    });
  });
  
  // Ensure all three transport types are represented
  const finalSegments = ensureAllTransportTypes(segments);
  
  return finalSegments;
};


// Bảng phát thải CO2 (gram/km) cho từng loại phương tiện
const CO2_EMISSION: Record<SegmentType, number> = {
  walking: 0,   // đi bộ = 0g/km
  bus: 20,      // xe buýt điện = 20g/km
  train: 15,     // tàu điện = 15g/km (trung bình 14-20)
  bicycle: 0,   // đi xe đạp = 0g/km
};

// Chuẩn xe máy = 50g/km. 5g CO2 = 1 điểm Xanh
export const calculateGreenPoints = (segment: Segment): number => {
  const baseline = 50; // xe máy phát thải chuẩn
  const emission = CO2_EMISSION[segment.type] ?? baseline;
  const saved = baseline - emission; // số gram tiết kiệm / km
  const pointsPerKm = saved / 5; // 5g = 1 điểm
  return Math.max(0, Math.round(pointsPerKm * segment.distance)); // nhân với số km
};

// Tính tổng Điểm Xanh cho cả tuyến đường
export const calculateRouteGreenPoints = (route: Route): number => {
  return route.segments.reduce((total, seg) => total + calculateGreenPoints(seg), 0);
};

const emissionFactors: Record<string, number> = {
  walking: 0,
  bicycle: 0,
  bus: 105,
  tram: 41,
  train: 41,
  car: 192,
};

export const calculateTotalEmission = (route: Route): number => {
  return route.segments.reduce((total, seg) => {
    const factor = emissionFactors[seg.type] ?? 0;
    const km = seg.distance / 1000;
    return Math.round(total + factor * km);
  }, 0);
};