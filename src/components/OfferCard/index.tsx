import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    Dimensions,
    StyleSheet,
} from 'react-native';
import Fonts from '../../constants/font';

const OfferCard = () => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Khuyến mãi</Text>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.offerGrid} style={styles.offerGrid}>
                <TouchableOpacity style={styles.offerCard}>
                    <Image
                        source={require('../../assets/images/vouncher_1.jpg')}
                        style={styles.offerImage}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.offerCard}>
                    <Image
                        source={require('../../assets/images/vouncher_2.jpg')}
                        style={styles.offerImage}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.offerCard}>
                    <Image
                        source={require('../../assets/images/vouncher_1.jpg')}
                        style={styles.offerImage}
                    />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default OfferCard;


const styles = StyleSheet.create({
    section: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.DelaGothicOne,
        color: '#333',
        marginBottom: 12,
    },
    offerGrid: {
        flexDirection: 'row',
        gap: 12,
        // paddingHorizontal: 16,
    },
    offerCard: {
        width: 200,
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
    },
    offerImage: {
        height: "100%",
        // height: 60,
        aspectRatio: 16 / 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    offerImageContainer: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 6,
        marginBottom: 8,
    },
    offerTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 2,
    },
    offerSubtitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    offerDiscount: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '500',
    },
})