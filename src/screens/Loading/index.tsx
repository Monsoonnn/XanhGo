import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { styles } from './styles';
const LoadingScreen = ({ navigation }: any) => {
    const fade = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(6)).current;
    const dot1 = useRef(new Animated.Value(0.4)).current;
    const dot2 = useRef(new Animated.Value(0.4)).current;
    const dot3 = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: 500, useNativeDriver: true }),
        ]).start();

        // start pulsing dots animation
        const pulse = (anim: Animated.Value) => Animated.sequence([
            Animated.timing(anim, { toValue: 1, duration: 420, useNativeDriver: true }),
            Animated.timing(anim, { toValue: 0.35, duration: 420, useNativeDriver: true }),
        ]);
        Animated.loop(Animated.stagger(140, [pulse(dot1), pulse(dot2), pulse(dot3)])).start();

        const timer = setTimeout(() => {
            navigation.navigate('SetGoalScreen');
        }, 1800);
        return () => clearTimeout(timer);
    }, [fade, translateY, navigation]);

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: fade, transform: [{ translateY }] }}>
                <View style={styles.titleBox}>
                    <Text style={styles.titleBig}>XANH</Text>
                    <View style={styles.lineRow}>
                        <Text style={styles.titleBig}>GO</Text>
                        <Image source={require('../../assets/loading/carrot.png')} style={styles.carrot} />
                    </View>
                    <View style={styles.lineRow}>
                        <Text style={styles.titleBig}>XIN</Text>
                        <Image source={require('../../assets/loading/butterfly.png')} style={styles.butterfly} />
                    </View>
                    <Text style={styles.titleBig}>CHÀO!</Text>
                </View>
                <Image source={require('../../assets/loading/rabbit.png')} style={styles.rabbit} />
            </Animated.View>
            <View style={styles.loadingRow}>
                {/* <ActivityIndicator size="small" color="#9CA3AF" style={{ marginBottom: 6 }} /> */}
                <View style={styles.dotLoader}>
                    <Animated.View style={[styles.dot, { opacity: dot1 }]} />
                    <Animated.View style={[styles.dot, { opacity: dot2, marginHorizontal: 8 }]} />
                    <Animated.View style={[styles.dot, { opacity: dot3 }]} />
                </View>
            </View>
        </View>
    );
};
export default LoadingScreen;