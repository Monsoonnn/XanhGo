import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from './styles';
const SetGoalScreen = ({ navigation }: any) => {
    const [goal, setGoal] = useState(50);
    const ticks = [0, 25, 50, 75, 100];
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/setGoal/rabbit.png')}
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
export default SetGoalScreen;