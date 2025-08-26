import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Animated } from 'react-native';

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
                        <Image source={require('../../assets/onboard/carrot.png')} style={styles.carrot} />
                    </View>
                    <View style={styles.lineRow}>
                        <Text style={styles.titleBig}>XIN</Text>
                        <Image source={require('../../assets/onboard/butterfly.png')} style={styles.butterfly} />
                    </View>
                    <Text style={styles.titleBig}>CHÀO!</Text>
                </View>
                <Image source={require('../../assets/onboard/rabbit_3.png')} style={styles.rabbit} />
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFDF3', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
    titleBox: { alignItems: 'flex-start', marginBottom: 5 },
    titleBig: { fontSize: 75, lineHeight: 84, fontWeight: '900', letterSpacing: 1, color: '#0F1720' },
    rabbit: { width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center' },
    pager: { flexDirection: 'row', marginTop: 8, alignItems: 'center', justifyContent: 'center' },
    // loadingRow is absolutely positioned so you can control distance from bottom
    loadingRow: { position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
    dotLoader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    dot: { width: 10, height: 10, borderRadius: 10, backgroundColor: '#262626', marginHorizontal: 2 },
    dotActive: { backgroundColor: '#9CA3AF', width: 10, height: 10 },
    lineRow: { flexDirection: 'row', alignItems: 'center' },
    carrot: { width: 35, height: 35, marginLeft: 8, resizeMode: 'contain' },
    butterfly: { width: 50, height: 50, marginLeft: 8, resizeMode: 'contain' },
});

export default LoadingScreen;
