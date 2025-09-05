// types/plant.ts
export interface Plant {
    id: string;
    name: string;
    imageUrl: string;
    isBought: boolean;
    priceCoin: number;
    priceMoney: number;
    currency: string;
    category?: string;
    description?: string;
    stock?: number;
}
