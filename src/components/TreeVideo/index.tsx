import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { View, AppState, AppStateStatus } from 'react-native';
import Video from 'react-native-video';
import styles from './styles';

export type TreeVideoHandle = {
    waterToPercent: (nextPercent: number) => void;
    setMountedPercent: (p: number) => void;
};

const TreeVideo = forwardRef<TreeVideoHandle, { percent: number }>(({ percent }, ref) => {
    const [duration, setDuration] = useState<number>(0);
    const [paused, setPaused] = useState<boolean>(true);
    const videoRef = useRef<any>(null);
    const targetTimeRef = useRef<number | null>(null);
    const currentPercentRef = useRef<number>(percent);
    const isMounted = useRef(true);
    const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    useEffect(() => {
        const sub = AppState.addEventListener('change', (next) => {
            setAppState(next);
            // if app goes to background, ensure video is paused
            if (next !== 'active') {
                setPaused(true);
            }
        });
        return () => sub.remove();
    }, []);

    // expose imperative methods
    useImperativeHandle(ref, () => ({
        waterToPercent: (nextPercent: number) => {
            if (!duration) {
                // if no duration yet, just toggle briefly
                setPaused(false);
                // pause quickly
                setTimeout(() => { if (isMounted.current) setPaused(true); }, 300);
                // keep the ref updated so when video loads we know the desired percent
                currentPercentRef.current = nextPercent;
                return;
            }

            const targetTime = (nextPercent / 100) * duration;
            const startTime = (currentPercentRef.current / 100) * duration;
            // If the start is already at/after target, just seek to target and pause
            if (startTime >= targetTime - 0.001) {
                if (videoRef.current?.seek) {
                    try { videoRef.current.seek(targetTime); } catch (e) { /* ignore */ }
                }
                setPaused(true);
                currentPercentRef.current = nextPercent;
                targetTimeRef.current = null;
                return;
            }

            // play from current percent forward to target
            targetTimeRef.current = targetTime;
            if (videoRef.current?.seek) {
                try { videoRef.current.seek(startTime); } catch (e) { /* ignore */ }
            }
            // ensure playback
            setPaused(false);
        },
        setMountedPercent: (p: number) => {
            // when video loads we may want to seek to current percent
            currentPercentRef.current = p;
            if (duration && videoRef.current?.seek) {
                const t = (p / 100) * duration;
                try { videoRef.current.seek(t); } catch (e) { /* ignore */ }
            }
        }
    }), [duration]);

    // Do not mount or interact with Video when app is not active
    if (appState !== 'active') {
        return <View style={styles.wrap} />;
    }

    return (
        <View style={styles.wrap}>
            <Video
                ref={videoRef}
                source={require('../../assets/tree/cay.mp4')}
                style={styles.video}
                resizeMode="cover"
                useTextureView={true}
                paused={paused}
                onLoad={(meta) => {
                    if (!isMounted.current) return;
                    const dur = meta.duration || 0;
                    setDuration(dur);
                    const initialTime = (percent / 100) * dur;
                    // seek immediately to the current percent and keep paused
                    if (videoRef.current?.seek) {
                        try { videoRef.current.seek(initialTime); } catch (e) { /* ignore */ }
                    }
                    setPaused(true);
                    currentPercentRef.current = percent;
                }}
                onProgress={({ currentTime }) => {
                    if (!duration) return;
                    const target = targetTimeRef.current;
                    if (target != null) {
                        // reached or passed the target - pause and update current percent
                        if (currentTime >= target - 0.05) {
                            setPaused(true);
                            const percentVal = Math.min(100, Math.max(0, (target / duration) * 100));
                            currentPercentRef.current = percentVal;
                            targetTimeRef.current = null;
                        }
                    } else {
                        // when playing normally update currentPercentRef so future water calls start from correct frame
                        const livePercent = Math.min(100, Math.max(0, (currentTime / duration) * 100));
                        currentPercentRef.current = livePercent;
                    }
                }}
                onSeek={() => { /* noop here - parent updates percent */ }}
                onError={(e) => console.log('Video error', e)}
            />
        </View>
    );
});

export default TreeVideo;
