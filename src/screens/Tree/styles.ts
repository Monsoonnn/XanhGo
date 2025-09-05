import { StyleSheet, Dimensions } from "react-native";
import Fonts from "../../constants/font";

const { width, height } = Dimensions.get("window");
const SIZE = Math.min(width, 360);
const CIRCLE_SIZE = SIZE * 0.7;
const SVG_PADDING = 8;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBFFF4",
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 26,
        fontFamily: Fonts.DelaGothicOne,
        color: '#111',
        paddingVertical: 6,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBtn: {
        marginLeft: 14,
        padding: 6,
        borderRadius: 20,
    },

    centerContent: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    smallTitle: {
        fontSize: 20,
        color: '#333',
        fontFamily: Fonts.Montserrat.SemiBold,
        marginTop: 8,
    },
    percentText: {
        fontSize: 56,
        fontWeight: '800',
        color: '#111',
        marginTop: 6,
        lineHeight: 64,
        fontFamily: Fonts.DelaGothicOne,
    },
    subText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },

    circleWrap: {
        // give extra space so the SVG stroke isn't clipped at the edges
        width: CIRCLE_SIZE + 16,
        height: CIRCLE_SIZE + 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        padding: 8,
    },
    potWrap: {
        position: 'absolute',
        top: SVG_PADDING + CIRCLE_SIZE * (1 - 0.964) / 2,
        left: SVG_PADDING + CIRCLE_SIZE * (1 - 0.964) / 2,
        width: CIRCLE_SIZE * 0.964,
        height: CIRCLE_SIZE * 0.964,
        borderRadius: CIRCLE_SIZE * 0.964 / 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    potImage: {
        width: '100%',
        height: '100%',
        // ensure the media fills the container and is centered
        alignSelf: 'center',
    },

    wateringBtn: {
        marginTop: 34,
    },
    wateringText: {
        fontFamily: Fonts.Montserrat.Medium,
        textDecorationLine: 'underline',
        color: '#2f6f4a',
        fontSize: 16,
    },

    bottomPill: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 22,
        height: 68,
        backgroundColor: '#fff',
        borderRadius: 34,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
        paddingHorizontal: 14,
    },
    tabItem: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabCenter: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#EAF7EE',
        borderWidth: 1,
        borderColor: '#DFF0E2',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 12,
        elevation: 8,
        justifyContent: 'space-around',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});