// API Mock Data - Mẫu dữ liệu từ server
export const mockApiResponse = {
  routes: [
    {
      id: 1,
      totalDuration: 45, // phút
      totalDistance: 8.5, // km
      totalPrice: 15000, // VNĐ
      startTime: "13:00",
      endTime: "13:45",
      segments: [
        {
          id: 1,
          type: "walking",
          duration: 8, // phút
          distance: 0.6, // km
          instruction: "Đi bộ đến trạm xe bus Lý Thường Kiệt",
          startLocation: {
            latitude: 21.0285,
            longitude: 105.8542,
            address: "Vị trí hiện tại"
          },
          endLocation: {
            latitude: 21.0245,
            longitude: 105.8412,
            address: "Trạm xe bus Lý Thường Kiệt"
          },
          coordinates: [
            [105.8542, 21.0285],
            [105.8512, 21.0265],
            [105.8462, 21.0255],
            [105.8412, 21.0245]
          ]
        },
        {
          id: 2,
          type: "bus",
          duration: 25, // phút
          distance: 6.2, // km
          instruction: "Đi xe bus tuyến 32 đến ga Hà Nội",
          busLine: "32",
          price: 7000,
          startLocation: {
            latitude: 21.0245,
            longitude: 105.8412,
            address: "Trạm xe bus Lý Thường Kiệt"
          },
          endLocation: {
            latitude: 21.0235,
            longitude: 105.8252,
            address: "Ga Hà Nội"
          },
          coordinates: [
            [105.8412, 21.0245],
            [105.8372, 21.0225],
            [105.8332, 21.0215],
            [105.8292, 21.0205],
            [105.8252, 21.0235]
          ],
          stops: [
            { name: "Trạm Hàng Bài", latitude: 21.0225, longitude: 105.8372 },
            { name: "Trạm Hoàn Kiếm", latitude: 21.0215, longitude: 105.8332 },
            { name: "Trạm Tràng Tiền", latitude: 21.0205, longitude: 105.8292 }
          ]
        },
        {
          id: 3,
          type: "train",
          duration: 15, // phút
          distance: 4.2, // km
          instruction: "Đi tàu metro line 2A đến ga Cát Linh",
          trainLine: "2A",
          price: 8000,
          startLocation: {
            latitude: 21.0235,
            longitude: 105.8252,
            address: "Ga Hà Nội"
          },
          endLocation: {
            latitude: 21.0185,
            longitude: 105.8142,
            address: "Ga Cát Linh"
          },
          coordinates: [
            [105.8252, 21.0235],
            [105.8222, 21.0215],
            [105.8192, 21.0195],
            [105.8142, 21.0185]
          ],
          stations: [
            { name: "Ga Hà Nội", latitude: 21.0235, longitude: 105.8252 },
            { name: "Ga La Khê", latitude: 21.0215, longitude: 105.8222 },
            { name: "Ga Văn Quán", latitude: 21.0195, longitude: 105.8192 },
            { name: "Ga Cát Linh", latitude: 21.0185, longitude: 105.8142 }
          ]
        },
        {
          id: 4,
          type: "walking",
          duration: 7, // phút
          distance: 0.5, // km
          instruction: "Đi bộ đến điểm đến",
          startLocation: {
            latitude: 21.0185,
            longitude: 105.8142,
            address: "Ga Cát Linh"
          },
          endLocation: {
            latitude: 21.0155,
            longitude: 105.8102,
            address: "Francelman - Điểm đến"
          },
          coordinates: [
            [105.8142, 21.0185],
            [105.8122, 21.0175],
            [105.8102, 21.0155]
          ]
        }
      ]
    },
    {
      id: 2,
      totalDuration: 52,
      totalDistance: 9.8,
      totalPrice: 12000,
      startTime: "13:00",
      endTime: "13:52",
      segments: [
        {
          id: 1,
          type: "walking",
          duration: 5,
          distance: 0.4,
          instruction: "Đi bộ đến trạm bus gần nhất",
          startLocation: {
            latitude: 21.0285,
            longitude: 105.8542,
            address: "Vị trí hiện tại"
          },
          endLocation: {
            latitude: 21.0275,
            longitude: 105.8502,
            address: "Trạm xe bus Hàng Khay"
          },
          coordinates: [
            [105.8542, 21.0285],
            [105.8522, 21.0280],
            [105.8502, 21.0275]
          ]
        },
        {
          id: 2,
          type: "bus",
          duration: 35,
          distance: 8.2,
          instruction: "Đi xe bus tuyến 18 đến gần điểm đến",
          busLine: "18",
          price: 7000,
          startLocation: {
            latitude: 21.0275,
            longitude: 105.8502,
            address: "Trạm xe bus Hàng Khay"
          },
          endLocation: {
            latitude: 21.0165,
            longitude: 105.8122,
            address: "Trạm xe bus Kim Mã"
          },
          coordinates: [
            [105.8502, 21.0275],
            [105.8462, 21.0255],
            [105.8422, 21.0235],
            [105.8382, 21.0215],
            [105.8342, 21.0195],
            [105.8302, 21.0175],
            [105.8122, 21.0165]
          ]
        },
        {
          id: 3,
          type: "walking",
          duration: 12,
          distance: 1.2,
          instruction: "Đi bộ đến điểm đến",
          startLocation: {
            latitude: 21.0165,
            longitude: 105.8122,
            address: "Trạm xe bus Kim Mã"
          },
          endLocation: {
            latitude: 21.0155,
            longitude: 105.8102,
            address: "Francelman - Điểm đến"
          },
          coordinates: [
            [105.8122, 21.0165],
            [105.8112, 21.0160],
            [105.8102, 21.0155]
          ]
        }
      ]
    }
  ]
};