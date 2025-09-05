import { View, Text, Image, Pressable } from "react-native";
import styles from "./styles";
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { useNavigation, StackActions, useRoute } from "@react-navigation/native";
import { PLANTS } from '../../data/plants';

const PaymentSuccessfulScreen = () => {
    function popToStore(navigation: any) {
        const state = navigation.getState();
        const routes = state.routes;
        const indexStore = routes.findIndex((r: { name: string }) => r.name === 'Store');
        if (indexStore !== -1) {
            // số bước cần pop = tổng số route - 1 (index cuối) - vị trí của Store
            const steps = routes.length - 1 - indexStore;
            if (steps > 0) {
                navigation.dispatch(StackActions.pop(steps));
            }
        } else {
            // Nếu không tìm thấy Store trong stack thì fallback navigate
            navigation.navigate('Store');
        }
    }
    const navigation = useNavigation<any>();
    const route: any = useRoute();
    const plantId = route?.params?.plantId;
    const plant = PLANTS.find((p) => p.id === String(plantId));
    return (
        <View style={styles.container}>
            <View style={styles.confettiContainer}>
                <Image source={require('../../assets/PaymentSuccessful/confetti.png')} />
                <Image source={require('../../assets/PaymentSuccessful/confetti.png')} />
            </View>
            <Svg
                style={{ marginTop: -56 }}
                width={97}
                height={97}
                viewBox="0 0 97 97"
                fill="none"
            >
                <G clipPath="url(#clip0)">
                    <Path
                        d="M48.5 96.4092C75.0097 96.4092 96.5 74.9188 96.5 48.4092C96.5 21.8995 75.0097 0.40918 48.5 0.40918C21.9903 0.40918 0.5 21.8995 0.5 48.4092C0.5 74.9188 21.9903 96.4092 48.5 96.4092Z"
                        fill="#32BA7C"
                    />
                    <Path
                        d="M36.2349 70.062L60.9163 94.7434C81.3579 89.2923 96.4998 70.6677 96.4998 48.409C96.4998 47.9547 96.4998 47.5005 96.4998 47.0462L77.1181 29.1787L36.2349 70.062Z"
                        fill="#0AA06E"
                    />
                    <Path
                        d="M49.7111 59.1601C51.831 61.28 51.831 64.914 49.7111 67.0339L45.32 71.4251C43.2001 73.5449 39.566 73.5449 37.4462 71.4251L18.2159 52.0434C16.096 49.9235 16.096 46.2894 18.2159 44.1695L22.607 39.7784C24.7269 37.6585 28.361 37.6585 30.4809 39.7784L49.7111 59.1601Z"
                        fill="white"
                    />
                    <Path
                        d="M66.5189 25.6964C68.6388 23.5765 72.2728 23.5765 74.3927 25.6964L78.7839 30.0875C80.9038 32.2074 80.9038 35.8415 78.7839 37.9613L45.4716 71.1222C43.3517 73.2421 39.7176 73.2421 37.5978 71.1222L33.2066 66.731C31.0867 64.6112 31.0867 60.9771 33.2066 58.8572L66.5189 25.6964Z"
                        fill="white"
                    />
                </G>
                <Defs>
                    <ClipPath id="clip0">
                        <Rect width="96" height="96" fill="white" x="0.5" y="0.40918" />
                    </ClipPath>
                </Defs>
            </Svg>
            <View style={styles.title}>
                <Text style={[styles.baseTitle, styles.titleText]}>Chúc mừng bạn đã mua thành công</Text>
                <Text style={[styles.baseTitle, styles.titleName]}>{plant?.name ?? 'Cây lưỡi hổ'}</Text>
            </View>
            <Text style={styles.message}>Hãy bắt đầu chăm sóc cây của bạn nhé!</Text>
            <Pressable
                style={styles.button}
                onPress={() => popToStore(navigation)}
            >
                <Text style={styles.buttonText}>Quay về cửa hàng</Text>
            </Pressable>
        </View>
    );
}

export default PaymentSuccessfulScreen;