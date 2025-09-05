import { Plant } from "../types/plant";

export const PLANTS: Plant[] = [
    {
        id: "1",
        name: "Bé Gai Gai",
        imageUrl: require('../assets/store/cay1.png'),
        isBought: true,
        priceCoin: 123,
        priceMoney: 24000,
        currency: "VND",
        category: "Xương rồng",
        description: "Xương rồng nhỏ dễ chăm."
    },
    {
        id: "2",
        name: "Anh Ba Chồi Non",
        imageUrl: require('../assets/store/cay2.png'),
        isBought: false,
        priceCoin: 123,
        priceMoney: 24000,
        currency: "VND",
        category: "Cây lá"
    },
    {
        id: "3",
        name: "Cây xương rồng",
        imageUrl: require('../assets/store/cay3.png'),
        isBought: false,
        priceCoin: 123,
        priceMoney: 24000,
        currency: "VND",
        category: "Xương rồng"
    },
    {
        id: "4",
        name: "Cây xương rồng",
        imageUrl: require('../assets/store/cay4.png'),
        isBought: false,
        priceCoin: 123,
        priceMoney: 24000,
        currency: "VND",
        category: "Xương rồng"
    }
];
