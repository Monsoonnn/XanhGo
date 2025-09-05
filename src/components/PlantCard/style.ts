import { StyleSheet } from "react-native";
import Fonts from "../../constants/font";

export const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 5,
        width: "48%",
        marginBottom: 16
    },
    imageWrap: {
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#EFEAD6",
        position: "relative",
        height: 140,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    image: { width: "90%", height: "90%" },
    boughtTag: {
        position: "absolute",
        top: 8,
        left: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    },
    boughtText: { color: "#16A34A", fontSize: 12, fontWeight: "600", fontFamily: Fonts.Montserrat.Medium },
    name: { fontSize: 16, fontWeight: "600", fontFamily: Fonts.Montserrat.SemiBold },
    cta: {
        backgroundColor: "#028961",
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 999
    },
    ctaText: { fontFamily: Fonts.Montserrat.SemiBold, color: "#fff" },
    priceRow: { flexDirection: "row", columnGap: 8, alignItems: "center" },
    coin: {
        alignItems: "center",
        flexDirection: "row",

    },
    badge: {
        backgroundColor: "#FAFDF3",
        borderRadius: 360,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        flexDirection: "row",
        alignItems: "center"
    },
    badgeIcon: { marginRight: 4 },
    coinText: { fontWeight: "600", fontFamily: Fonts.Montserrat.SemiBold, color: "#29B26B", fontSize: 14 },
    badgeText: { fontWeight: "600", fontFamily: Fonts.Montserrat.Regular, fontSize: 14, color: "#262626" },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalCard: {
        width: 303,
        backgroundColor: '#FBFFF4',
        borderRadius: 16,
        paddingHorizontal: 18,
        paddingBottom: 18,
        alignItems: 'center'
    },
    modalView: {
        width: 303,
        height: 167,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: '#EFEAD6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12
    },
    modalImage: {
        width: 303,
        height: 141,
    },
    modalTitle: {
        fontFamily: Fonts.DelaGothicOne,
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 8
    },
    modalDescription: {
        fontFamily: Fonts.Montserrat.Regular,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        textAlign: 'center',
        color: '#525252'
    },
    priceLabel: {
        fontFamily: Fonts.Montserrat.Regular,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: '#525252',
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 24
    },
    outlineButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 360,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        padding: 12,
        marginRight: 8,
        alignItems: 'center',
        color: '#fff'
    },
    solidButton: {
        display: 'flex',
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        flex: 1,
        borderRadius: 360,
        backgroundColor: '#028961',
        flexDirection: 'row'
    },
    outlineButtonText: {
        color: '#262626',
        fontFamily: Fonts.Montserrat.Medium,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 24,
    },
    priceCoinText: {
        color: '#fff',
        fontFamily: Fonts.Montserrat.Medium,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 24,
    }
});