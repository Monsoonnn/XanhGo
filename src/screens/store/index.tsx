import React, { useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Plant } from "../../types/plant";
import { styles } from "./style";
import PlantCard from "../../components/PlantCard";
import { PLANTS } from "../../data/plants";

export default function ShopScreen() {
    const [items, setItems] = useState<Plant[]>(PLANTS);

    const handleBuy = (plant: Plant) => {
        setItems((prev) =>
            prev.map((p) => (p.id === plant.id ? { ...p, isBought: true } : p))
        );
    };

    const handleContinue = (plant: Plant) => {
        console.log("Trồng tiếp:", plant.name);
    };

    return (
        <SafeAreaView style={styles.safe}>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                // reduce how many items FlatList renders at once and avoid clipping removal
                removeClippedSubviews={false}
                initialNumToRender={6}
                windowSize={5}
                maxToRenderPerBatch={6}
                updateCellsBatchingPeriod={50}
                renderItem={({ item }) => (
                    <PlantCard plant={item} onBuy={handleBuy} onContinue={handleContinue} />
                )}
            />
        </SafeAreaView>
    );
}


