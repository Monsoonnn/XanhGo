import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, Animated, Easing } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { styles } from "./styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, { Path, Circle } from 'react-native-svg';
const AnimatedCircle: any = Animated.createAnimatedComponent(Circle as any);
import BottomBar from "../../components/BottomBar";
import TreeVideo from '../../components/TreeVideo';

const { width } = Dimensions.get("window");
const SIZE = Math.min(width, 360);
const CIRCLE_SIZE = SIZE * 0.7; // diameter of circle
const STROKE_WIDTH = 12;
// add padding so the SVG stroke doesn't get clipped by the container
const SVG_PADDING = 8; // matches styles.padding
const SVG_SIZE = CIRCLE_SIZE + SVG_PADDING * 2;
const RADIUS = (SVG_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const Tree = () => {
    const [percent, setPercent] = useState(25);
    const WATER_INCREMENT = 5;
    const navigation = useNavigation();

    const videoRef = useRef<any>(null);
    const isFocused = useIsFocused();
    const [showVideo, setShowVideo] = React.useState<boolean>(true);

    // when the screen is unfocused, ensure video is paused to avoid native SurfaceView detach during transitions
    useEffect(() => {
        if (!isFocused) {
            // hide video when unfocused to ensure native SurfaceView is removed before transitions
            // try to persist current percent in the video component if mounted
            if (videoRef.current?.setMountedPercent) {
                try { videoRef.current.setMountedPercent(percent); } catch (e) { /* ignore */ }
            }
            setShowVideo(false);
        } else {
            // when focused again, allow video to mount
            setShowVideo(true);
        }
    }, [isFocused]);

    // also listen for navigation removal to immediately stop video
    useEffect(() => {
        const sub = navigation.addListener('beforeRemove', () => {
            setShowVideo(false);
        });
        return sub;
    }, [navigation]);

    // also hide video immediately when screen loses focus
    useEffect(() => {
        const off = navigation.addListener('blur', () => {
            setShowVideo(false);
        });
        return off;
    }, [navigation]);

    // normalize percent: clamp to [0,100] and treat >=97 as 100 so animation snaps to full
    const clampPercent = (p: number) => {
        const q = Math.min(100, Math.max(0, Math.round(p)));
        return q >= 97 ? 100 : q;
    };

    const progress = Math.max(0, Math.min(100, percent));
    // animated percent -> maps to strokeDashoffset
    const animatedValue = useRef(new Animated.Value(progress)).current;
    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: progress,
            duration: 500,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const offset = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [CIRCUMFERENCE, 0],
    });

    const handleWater = () => {
        const nextRaw = Math.min(100, percent + WATER_INCREMENT);
        const next = clampPercent(nextRaw);
        // always update parent state so UI (percent & button) reflects change
        setPercent(next);
        // delegate to TreeVideo to perform seek/play if available
        if (videoRef.current?.waterToPercent) {
            try { videoRef.current.waterToPercent(next); } catch (e) { /* ignore */ }
        }
    }
    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tưới cây</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('HistoryTree' as never)}>
                        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                            <Path d="M3 12C3 13.78 3.52784 15.5201 4.51677 17.0001C5.50571 18.4802 6.91131 19.6337 8.55585 20.3149C10.2004 20.9961 12.01 21.1743 13.7558 20.8271C15.5016 20.4798 17.1053 19.6226 18.364 18.364C19.6226 17.1053 20.4798 15.5016 20.8271 13.7558C21.1743 12.01 20.9961 10.2004 20.3149 8.55585C19.6337 6.91131 18.4802 5.50571 17.0001 4.51677C15.5201 3.52784 13.78 3 12 3C9.48395 3.00947 7.06897 3.99122 5.26 5.74L3 8M3 8V3M3 8H8M12 7V12L16 14" stroke="#333" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Store' as never)}>
                        <Ionicons name="storefront-outline" size={22} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* content */}
            <View style={styles.centerContent}>
                <Text style={styles.smallTitle}>Cây may mắn</Text>
                <Text style={styles.percentText}>{100 - percent}%</Text>
                <Text style={styles.subText}>Còn lại</Text>

                <View style={styles.circleWrap}>
                    <Svg width={SVG_SIZE} height={SVG_SIZE}>
                        <Circle
                            stroke="#ECEBD7"
                            cx={SVG_SIZE / 2}
                            cy={SVG_SIZE / 2}
                            r={RADIUS}
                            strokeWidth={STROKE_WIDTH}
                            fill="none"
                        />
                        <AnimatedCircle
                            stroke="#3CB371"
                            cx={SVG_SIZE / 2}
                            cy={SVG_SIZE / 2}
                            r={RADIUS}
                            strokeWidth={STROKE_WIDTH}
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                            strokeDashoffset={offset as any}
                            transform={`rotate(-90 ${SVG_SIZE / 2} ${SVG_SIZE / 2})`}
                        />
                    </Svg>

                    {/* video centered on circle */}
                    <View style={styles.potWrap}>
                        {isFocused && showVideo ? (
                            <TreeVideo ref={videoRef} percent={percent} />
                        ) : (
                            // placeholder so layout stays stable when video is not mounted
                            <View style={styles.potImage} />
                        )}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.wateringBtn}
                    onPress={handleWater}
                    disabled={percent >= 100}
                >
                    <Text style={styles.wateringText}>
                        {percent >= 100 ? 'Đã đủ' : 'Tưới cây'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* bottom pill tab (mock) */}
            <BottomBar tree={true} />

        </View>
    );
};
export default Tree;