import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Pressable, Platform, Alert } from 'react-native';
import { styles } from './styles';
import { Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import ViewShot from 'react-native-view-shot';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useNavigation } from '@react-navigation/native';
const PaymentScreen = () => {
    const viewShotRef = useRef<any>(null);
    // set a countdown for testing payment success navigation
    const [countdown, setCountdown] = useState<number | null>(null);
    const navigation = useNavigation<any>();

    // read incoming plantId param so we can forward it
    const route: any = (navigation as any).dangerouslyGetState ? undefined : undefined;
    // Use navigation route param via hook - safer to access via navigation.getState isn't necessary here
    // We'll read param using navigation.getState in a small helper below when navigating
    useEffect(() => {
        if (countdown == null) return;
        if (countdown <= 0) {
            // navigate to PaymentSuccessful and reset
            setCountdown(null);
            // forward the same plantId param if present in current route
            const current = (navigation as any).getState?.();
            let plantId = undefined;
            try {
                const routes = current.routes;
                const idx = current.index ?? (routes ? routes.length - 1 : 0);
                plantId = routes?.[idx]?.params?.plantId;
            } catch (e) { /* ignore */ }
            navigation.navigate('PaymentSuccessfulScreen', { plantId });
            return;
        }
        const t = setTimeout(() => setCountdown(c => (c ?? 0) - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown]);

    const handleDownload = async () => {
        // start 10s countdown immediately
        setCountdown(10);
        try {
            // 1) Capture view to an image file
            const uri: string = await viewShotRef.current.capture?.({ format: 'png', quality: 0.9 });
            if (!uri) throw new Error('Không thể chụp màn hình');

            // 2) Request permission depending on platform / SDK
            let permissionResult;
            if (Platform.OS === 'ios') {
                // PHOTO_LIBRARY_ADD_ONLY allows adding without full library read on iOS 14+
                permissionResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY).catch(() => RESULTS.DENIED);
            } else {
                // Android: for API >= 33 use READ_MEDIA_IMAGES, otherwise request WRITE_EXTERNAL_STORAGE
                const sdk = Platform.Version as number;
                const permissionToRequest = sdk >= 33 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
                permissionResult = await request(permissionToRequest).catch(() => RESULTS.DENIED);
            }

            if (permissionResult !== RESULTS.GRANTED) {
                Alert.alert('Quyền bị từ chối', 'Bạn cần cho phép truy cập thư viện ảnh để lưu hình. Vào Cài đặt để bật quyền.');
                return;
            }

            // 3) Save to gallery
            await CameraRoll.saveAsset(uri, { type: 'photo' });
            Alert.alert('Hoàn tất', '✅ Đã lưu ảnh vào thư viện!');
        } catch (e) {
            console.error(e);
            Alert.alert('Lỗi', 'Không thể lưu ảnh. Kiểm tra log để biết chi tiết.');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan mã QR để thanh toán</Text>
            <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }} style={{ alignItems: 'center', backgroundColor: '#FAFDF3' }}>
                <Image source={require('../../assets/pay/qr.png')} style={styles.qrCode} />

                <View style={styles.description}>
                    <View style={styles.line}>
                        <Text style={styles.descriptionText}>Tên chủ tài khoản: </Text>
                        <Text style={styles.name}>XanhGo Platform</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.descriptionText}>Số tài khoản: </Text>
                        <Text style={styles.number}>0123 4567 8910 1122</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.descriptionText}>Số tiền: </Text>
                        <Text style={styles.number}>24.000 VNĐ</Text>
                    </View>
                </View>
            </ViewShot>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? "#f0f0f0" : "#fff" }, // đổi màu khi nhấn
                ]}
                onPress={handleDownload}
            >
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M9.31982 12.498L11.8798 15.058L14.4398 12.498"
                        stroke={'#262626'}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path
                        d="M11.8799 4.81836V14.9884"
                        stroke={'#262626'}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path
                        d="M20 12.998C20 17.418 17 20.998 12 20.998C7 20.998 4 17.418 4 12.998"
                        stroke={'#262626'}
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
                <Text style={styles.text}>{countdown ? `Đang xử lý... ${countdown}s` : 'Tải ảnh về'}</Text>
            </Pressable>
        </View>
    );
};
export default PaymentScreen;