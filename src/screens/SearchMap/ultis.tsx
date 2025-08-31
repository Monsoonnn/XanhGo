// Xác định loại địa điểm
export const getPlaceCategory = (type: string): string => {
    const categoryMap: Record<string, string> = {
        poi: 'Địa điểm',
        address: 'Địa chỉ',
        place: 'Khu vực',
        region: 'Vùng',
        country: 'Quốc gia',
        postcode: 'Mã bưu chính',
        district: 'Quận/Huyện',
        locality: 'Thành phố',
    };
    return categoryMap[type] || 'Địa điểm';
};

// Tính khoảng cách
export const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): string => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance < 1
        ? `${Math.round(distance * 1000)}m`
        : `${distance.toFixed(1)}km`;
};

export const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
        'Địa điểm': 'place',
        'Địa chỉ': 'home',
        'Khu vực': 'location-city',
        'Thành phố': 'location-city',
        'Quận/Huyện': 'map',
    };
    return iconMap[category] || 'place';
};