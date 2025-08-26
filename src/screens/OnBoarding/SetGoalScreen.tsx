import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
const SetGoalScreen = ({ navigation }: any) => {
    const [goal, setGoal] = useState(50);
    const ticks = [0, 25, 50, 75, 100];
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/onboard/rabbit_4.png')}
                style={styles.image}
            />
            <Text style={styles.title}>Đặt mục tiêu hàng ngày</Text>
            <Text style={styles.label}>Đặt một mục tiêu số lượng cacbon giảm thiểu mỗi ngày để có động lực hơn bạn nhé!</Text>
            <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={100}
                step={25}
                value={goal}
                onValueChange={setGoal}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#111"
            />
            <View style={styles.ticksContainer}>
                {ticks.map((t) => (
                    <View key={t} style={styles.tickColumn}>
                        <Text style={[styles.tickLabel, goal === t ? styles.tickLabelActive : null]}>{t}g</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Home', { goal })}>
                <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAF5', padding: 24, justifyContent: 'center' },
    image: { width: 110, height: 141, resizeMode: 'contain', alignSelf: 'center', marginBottom: 30 },
    title: { fontSize: 25, fontFamily: 'Montserrat-Bold', marginBottom: 12, textAlign: 'center' },
    label: { fontSize: 15, fontFamily: 'Montserrat-Regular', marginBottom: 24, textAlign: 'center' },
    button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 24, alignItems: 'center', marginTop: 60 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    ticksContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, marginTop: 8 },
    tickColumn: { alignItems: 'center' },
    tickLabel: { marginTop: 8, color: '#6B7280' },
    tickLabelActive: { color: '#111', fontWeight: '700' },
});

export default SetGoalScreen;
