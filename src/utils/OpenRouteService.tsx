interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

class OpenRouteService {
  static BASE_URL = 'https://api.openrouteservice.org/v2';
  
  // Bạn có thể đăng ký miễn phí tại https://openrouteservice.org để có API key
  // Hoặc sử dụng public endpoint (có giới hạn)
  static API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjFkZmI2YjMzMzJkYzRiMmM5ZGQxYTI0ZWI2MmNlZGJlIiwiaCI6Im11cm11cjY0In0='; // Thay bằng API key của bạn

  static async getDirections(start: Location, end: Location, profile: string = 'foot-walking') {
  try {
    const coordinates = `${start.longitude},${start.latitude}|${end.longitude},${end.latitude}`;
    const url = `${this.BASE_URL}/directions/${profile}?coordinates=${coordinates}&format=geojson`;
    
    const headers: HeadersInit_ = {};
    if (this.API_KEY !== 'YOUR_ORS_API_KEY_HERE') {
      headers['Authorization'] = this.API_KEY;
    }

    const response = await fetch(url, { headers });
    
    if (response.ok) {
      const data = await response.json();
      return this.parseOSRMResponse(data);
    } else {
      throw new Error(`ORS API Error: ${response.status}`);
    }
  } catch (error) {
    console.error('OpenRouteService Error:', error);
    return this.getMockRoute(start, end, profile);
  }
}

  static parseOSRMResponse(data: any) {
    if (data.features && data.features.length > 0) {
      const route = data.features[0];
      const coordinates = route.geometry.coordinates.map((coord: number[]) => ({
        latitude: coord[1],
        longitude: coord[0]
      }));
      
      return {
        coordinates,
        duration: route.properties.summary?.duration || 0,
        distance: route.properties.summary?.distance || 0
      };
    }
    return null;
  }

  static getMockRoute(start: Location, end: Location, profile: string) {
    // Simple mock route - straight line with some points
    const steps = 5;
    const coordinates = [];
    
    for (let i = 0; i <= steps; i++) {
      const lat = start.latitude + (end.latitude - start.latitude) * (i / steps);
      const lng = start.longitude + (end.longitude - start.longitude) * (i / steps);
      coordinates.push({ latitude: lat, longitude: lng });
    }

    const distance = this.calculateDistance(start, end);
    const duration = profile === 'foot-walking' ? distance * 12 : distance * 2; // phút

    return {
      coordinates,
      duration,
      distance
    };
  }

  static calculateDistance(start: Location, end: Location): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(end.latitude - start.latitude);
    const dLon = this.toRad(end.longitude - start.longitude);
    const lat1 = this.toRad(start.latitude);
    const lat2 = this.toRad(end.latitude);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  static toRad(value: number): number {
    return value * Math.PI / 180;
  }
}