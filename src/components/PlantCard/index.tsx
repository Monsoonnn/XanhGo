import React, { useState } from "react";
import { Image, Pressable, Text, View, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { Plant } from "../../types/plant";
import { styles } from "./style";


interface PlantCardProps {
    plant: Plant;
    onBuy?: (plant: Plant) => void;
    onContinue?: (plant: Plant) => void;
}

const formatVND = (n: number) =>
    typeof n === "number" ? n.toLocaleString("vi-VN") + " đ" : n;

const PlantCardInner: React.FC<PlantCardProps> = ({ plant, onBuy, onContinue }) => {
    const [open, setOpen] = useState(false);
    const navigation = useNavigation<any>();

    return (
        <View style={styles.card}>
            <View style={styles.imageWrap}>
                <Image
                    source={
                        // support static require (local asset) or remote uri
                        typeof plant.imageUrl === 'number' ? plant.imageUrl : { uri: plant.imageUrl }
                    }
                    style={styles.image}
                    resizeMode="contain"
                />
                {plant.isBought && (
                    <View style={styles.boughtTag}>
                        <Text style={styles.boughtText}>Đã mua</Text>
                    </View>
                )}
            </View>

            <Text numberOfLines={1} style={styles.name}>
                {plant.name}
            </Text>

            {plant.isBought ? (
                <Pressable onPress={() => onContinue?.(plant)} style={styles.cta}>
                    <Text style={styles.ctaText}>Trồng tiếp</Text>
                </Pressable>
            ) : (
                <Pressable onPress={() => setOpen(true)} style={styles.priceRow}>
                    <View style={styles.coin}>
                        <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
                            <Path d="M8.49993 19C7.64193 19.0019 6.80604 18.7279 6.11569 18.2184C5.42534 17.7089 4.91711 16.9909 4.66605 16.1705C4.41498 15.35 4.43438 14.4706 4.72138 13.662C5.00839 12.8534 5.54778 12.1586 6.25993 11.68C5.82086 11.1314 5.55709 10.4633 5.50294 9.76273C5.4488 9.06214 5.60678 8.36148 5.95633 7.75191C6.30589 7.14235 6.83083 6.65212 7.46284 6.34501C8.09485 6.0379 8.80467 5.92813 9.49993 6.03V6C9.49993 5.20435 9.816 4.44129 10.3786 3.87868C10.9412 3.31607 11.7043 3 12.4999 3C13.2956 3 14.0586 3.31607 14.6212 3.87868C15.1839 4.44129 15.4999 5.20435 15.4999 6V6.04C16.1952 5.93813 16.905 6.0479 17.537 6.35501C18.169 6.66212 18.694 7.15235 19.0435 7.76191C19.3931 8.37148 19.5511 9.07214 19.4969 9.77273C19.4428 10.4733 19.179 11.1414 18.7399 11.69C19.4476 12.1702 19.9828 12.8645 20.2669 13.6712C20.551 14.4778 20.5691 15.3543 20.3185 16.1719C20.068 16.9896 19.5619 17.7055 18.8747 18.2144C18.1874 18.7234 17.3551 18.9987 16.4999 19H8.49993Z" fill="#BEDEAB" />
                            <Path d="M12.4999 19V22V19Z" fill="#BEDEAB" />
                            <Path d="M12.4999 19V22M8.49993 19C7.64193 19.0019 6.80604 18.7279 6.11569 18.2184C5.42534 17.7089 4.91711 16.9909 4.66605 16.1705C4.41498 15.35 4.43438 14.4706 4.72138 13.662C5.00839 12.8534 5.54778 12.1586 6.25993 11.68C5.82086 11.1314 5.55709 10.4633 5.50294 9.76273C5.4488 9.06214 5.60678 8.36148 5.95633 7.75191C6.30589 7.14235 6.83083 6.65212 7.46284 6.34501C8.09485 6.0379 8.80467 5.92813 9.49993 6.03V6C9.49993 5.20435 9.816 4.44129 10.3786 3.87868C10.9412 3.31607 11.7043 3 12.4999 3C13.2956 3 14.0586 3.31607 14.6212 3.87868C15.1839 4.44129 15.4999 5.20435 15.4999 6V6.04C16.1952 5.93813 16.905 6.0479 17.537 6.35501C18.169 6.66212 18.694 7.15235 19.0435 7.76191C19.3931 8.37148 19.5511 9.07214 19.4969 9.77273C19.4428 10.4733 19.179 11.1414 18.7399 11.69C19.4476 12.1702 19.9828 12.8645 20.2669 13.6712C20.551 14.4778 20.5691 15.3543 20.3185 16.1719C20.068 16.9896 19.5619 17.7055 18.8747 18.2144C18.1874 18.7234 17.3551 18.9987 16.4999 19H8.49993Z" stroke="#29B26B" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                        <Text style={styles.coinText}>{plant.priceCoin}</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{formatVND(plant.priceMoney)}</Text>
                    </View>
                </Pressable>
            )}

            {/* Purchase modal */}
            <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
                <Pressable onPress={() => setOpen(false)} style={styles.modalBackground}>
                    <Pressable onPress={() => { /* stop propagation - don't close when tapping inside */ }} style={styles.modalCard}>
                        <View style={styles.modalView}>
                            <Image source={typeof plant.imageUrl === 'number' ? plant.imageUrl : { uri: plant.imageUrl }} style={styles.modalImage} resizeMode="contain" />
                        </View>
                        <Text style={styles.modalTitle}>{plant.name}</Text>
                        <Text style={styles.modalDescription}>Mô tả sản phẩm tạm thời. Thay bằng nội dung thật nếu có.</Text>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Dùng</Text>
                            <View style={styles.coin}>
                                <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
                                    <Path d="M8.49993 19C7.64193 19.0019 6.80604 18.7279 6.11569 18.2184C5.42534 17.7089 4.91711 16.9909 4.66605 16.1705C4.41498 15.35 4.43438 14.4706 4.72138 13.662C5.00839 12.8534 5.54778 12.1586 6.25993 11.68C5.82086 11.1314 5.55709 10.4633 5.50294 9.76273C5.4488 9.06214 5.60678 8.36148 5.95633 7.75191C6.30589 7.14235 6.83083 6.65212 7.46284 6.34501C8.09485 6.0379 8.80467 5.92813 9.49993 6.03V6C9.49993 5.20435 9.816 4.44129 10.3786 3.87868C10.9412 3.31607 11.7043 3 12.4999 3C13.2956 3 14.0586 3.31607 14.6212 3.87868C15.1839 4.44129 15.4999 5.20435 15.4999 6V6.04C16.1952 5.93813 16.905 6.0479 17.537 6.35501C18.169 6.66212 18.694 7.15235 19.0435 7.76191C19.3931 8.37148 19.5511 9.07214 19.4969 9.77273C19.4428 10.4733 19.179 11.1414 18.7399 11.69C19.4476 12.1702 19.9828 12.8645 20.2669 13.6712C20.551 14.4778 20.5691 15.3543 20.3185 16.1719C20.068 16.9896 19.5619 17.7055 18.8747 18.2144C18.1874 18.7234 17.3551 18.9987 16.4999 19H8.49993Z" fill="#BEDEAB" />
                                    <Path d="M12.4999 19V22V19Z" fill="#BEDEAB" />
                                    <Path d="M12.4999 19V22M8.49993 19C7.64193 19.0019 6.80604 18.7279 6.11569 18.2184C5.42534 17.7089 4.91711 16.9909 4.66605 16.1705C4.41498 15.35 4.43438 14.4706 4.72138 13.662C5.00839 12.8534 5.54778 12.1586 6.25993 11.68C5.82086 11.1314 5.55709 10.4633 5.50294 9.76273C5.4488 9.06214 5.60678 8.36148 5.95633 7.75191C6.30589 7.14235 6.83083 6.65212 7.46284 6.34501C8.09485 6.0379 8.80467 5.92813 9.49993 6.03V6C9.49993 5.20435 9.816 4.44129 10.3786 3.87868C10.9412 3.31607 11.7043 3 12.4999 3C13.2956 3 14.0586 3.31607 14.6212 3.87868C15.1839 4.44129 15.4999 5.20435 15.4999 6V6.04C16.1952 5.93813 16.905 6.0479 17.537 6.35501C18.169 6.66212 18.694 7.15235 19.0435 7.76191C19.3931 8.37148 19.5511 9.07214 19.4969 9.77273C19.4428 10.4733 19.179 11.1414 18.7399 11.69C19.4476 12.1702 19.9828 12.8645 20.2669 13.6712C20.551 14.4778 20.5691 15.3543 20.3185 16.1719C20.068 16.9896 19.5619 17.7055 18.8747 18.2144C18.1874 18.7234 17.3551 18.9987 16.4999 19H8.49993Z" stroke="#29B26B" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                                <Text style={styles.coinText}>{plant.priceCoin}</Text>
                            </View>
                            <Text style={styles.priceLabel}>hoặc</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{formatVND(plant.priceMoney)}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonRow}>
                            <Pressable onPress={() => { setOpen(false); navigation.navigate('PaymentScreen', { plantId: plant.id }); }} style={styles.outlineButton}>
                                <Text style={styles.outlineButtonText}>Mua ngay</Text>
                            </Pressable>
                            <Pressable onPress={() => { setOpen(false); onBuy?.(plant); }} style={styles.solidButton}>
                                <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
                                    <Path d="M8.49993 19C7.64193 19.0019 6.80604 18.7279 6.11569 18.2184C5.42534 17.7089 4.91711 16.9909 4.66605 16.1705C4.41498 15.35 4.43438 14.4706 4.72138 13.662C5.00839 12.8534 5.54778 12.1586 6.25993 11.68C5.82086 11.1314 5.55709 10.4633 5.50294 9.76273C5.4488 9.06214 5.60678 8.36148 5.95633 7.75191C6.30589 7.14235 6.83083 6.65212 7.46284 6.34501C8.09485 6.0379 8.80467 5.92813 9.49993 6.03V6C9.49993 5.20435 9.816 4.44129 10.3786 3.87868C10.9412 3.31607 11.7043 3 12.4999 3C13.2956 3 14.0586 3.31607 14.6212 3.87868C15.1839 4.44129 15.4999 5.20435 15.4999 6V6.04C16.1952 5.93813 16.905 6.0479 17.537 6.35501C18.169 6.66212 18.694 7.15235 19.0435 7.76191C19.3931 8.37148 19.5511 9.07214 19.4969 9.77273C19.4428 10.4733 19.179 11.1414 18.7399 11.69C19.4476 12.1702 19.9828 12.8645 20.2669 13.6712C20.551 14.4778 20.5691 15.3543 20.3185 16.1719C20.068 16.9896 19.5619 17.7055 18.8747 18.2144C18.1874 18.7234 17.3551 18.9987 16.4999 19H8.49993Z" fill="#BEDEAB" />
                                    <Path d="M12.4999 19V22V19Z" fill="#BEDEAB" />
                                    <Path d="M12.4999 19V22M8.49993 19C7.64193 19.0019 6.80604 18.7279 6.11569 18.2184C5.42534 17.7089 4.91711 16.9909 4.66605 16.1705C4.41498 15.35 4.43438 14.4706 4.72138 13.662C5.00839 12.8534 5.54778 12.1586 6.25993 11.68C5.82086 11.1314 5.55709 10.4633 5.50294 9.76273C5.4488 9.06214 5.60678 8.36148 5.95633 7.75191C6.30589 7.14235 6.83083 6.65212 7.46284 6.34501C8.09485 6.0379 8.80467 5.92813 9.49993 6.03V6C9.49993 5.20435 9.816 4.44129 10.3786 3.87868C10.9412 3.31607 11.7043 3 12.4999 3C13.2956 3 14.0586 3.31607 14.6212 3.87868C15.1839 4.44129 15.4999 5.20435 15.4999 6V6.04C16.1952 5.93813 16.905 6.0479 17.537 6.35501C18.169 6.66212 18.694 7.15235 19.0435 7.76191C19.3931 8.37148 19.5511 9.07214 19.4969 9.77273C19.4428 10.4733 19.179 11.1414 18.7399 11.69C19.4476 12.1702 19.9828 12.8645 20.2669 13.6712C20.551 14.4778 20.5691 15.3543 20.3185 16.1719C20.068 16.9896 19.5619 17.7055 18.8747 18.2144C18.1874 18.7234 17.3551 18.9987 16.4999 19H8.49993Z" stroke="#29B26B" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                                <Text style={styles.priceCoinText}>{plant.priceCoin}</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View >
    );
};

const PlantCard = React.memo(PlantCardInner, (prev, next) => {
    return prev.plant.id === next.plant.id && prev.plant.isBought === next.plant.isBought;
});

export default PlantCard;


