import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../screens/HistoryTree/styles';

const PlantRow = ({ item }: { item: any }) => (
    <View style={styles.plantRow}>
        <View style={styles.plantLeft}>
            {item.imageUrl ? (
                <Image source={item.imageUrl} style={styles.plantIcon} resizeMode='contain' />
            ) : (
                <View style={styles.plantIcon} />
            )}
            <View style={styles.plantTextWrap}>
                <Text style={styles.plantWhen}>{item.when}</Text>
                <Text style={styles.plantName}>{item.name}</Text>
            </View>
        </View>
        <View style={styles.plantRight}>
            {item.status === 'claim' ? (
                <TouchableOpacity style={styles.claimBtn}>
                    <Text style={styles.claimBtnText}>Đổi quà</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.claimedBtn}>
                    <Text style={styles.claimedBtnText}>Đã đổi</Text>
                </View>
            )}
        </View>
    </View>
);

export default React.memo(PlantRow);
