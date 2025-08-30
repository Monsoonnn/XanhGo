import { StyleSheet } from "react-native";
import Fonts from "../../constants/font";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F0',
        paddingBottom: 80,
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.DelaGothicOne,
        marginLeft: 16,
    },
    // Header Styles
    headerContainer: {
        backgroundColor: '#F0F4F0',
        paddingTop: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 8,
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    settingsButton: {
        padding: 8,
    },

    // Profile Card Styles
    profileCard: {
        // backgroundColor: 'white',
        marginHorizontal: 16,
        marginVertical: 8,
    },
    avatarContainer: {
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 38,
        backgroundColor: '#EFEAD6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    profileInfo: {
        marginBottom: 20,
    },
    profileName: {
        fontSize: 20,
        fontFamily: Fonts.DelaGothicOne,
        marginBottom: 4,
    },
    profileSubtext: {
        fontSize: 12,
        fontFamily: Fonts.Montserrat.Medium,
    },
    editButton: {
        backgroundColor: '#10B981',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        gap: 8,
    },
    editButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },

    // CO2 Card Styles
    co2Card: {
        // backgroundColor: '#BFDBFE',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 16,
        position: 'relative',
        overflow: 'hidden',
    },
    co2Header: {
        marginBottom: 8,
    },
    co2Title: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    co2Content: {
        alignItems: 'flex-start',
    },
    co2MainStat: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 4,
    },
    co2Number: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#374151',
    },
    co2Unit: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginLeft: 4,
    },
    co2Subtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 10,
    },
    co2Decoration: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 120,
        height: '100%',
    },
    cloudSmall: {
        width: 30,
        height: 20,
        backgroundColor: '#93C5FD',
        borderRadius: 15,
        position: 'absolute',
        top: 20,
        right: 30,
    },
    cloudLarge: {
        width: 40,
        height: 25,
        backgroundColor: '#93C5FD',
        borderRadius: 20,
        position: 'absolute',
        top: 35,
        right: 15,
    },
    flower1: {
        width: 12,
        height: 12,
        backgroundColor: '#F472B6',
        borderRadius: 6,
        position: 'absolute',
        bottom: 20,
        right: 40,
    },
    flower2: {
        width: 10,
        height: 10,
        backgroundColor: '#FBBF24',
        borderRadius: 5,
        position: 'absolute',
        bottom: 30,
        right: 20,
    },

    // Achievement Styles
    achievementContainer: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    achievementTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statItem: {
        width: '48%',
        alignItems: 'center',
        marginBottom: 20,
    },
    statIcon: {
        marginBottom: 8,
    },
    statNumber: {
        fontSize: 24,
        fontFamily: Fonts.DelaGothicOne,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: Fonts.Montserrat.Regular,
    },
    header: {
        position: 'relative',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 50,
        backgroundColor: '#fff',
    },
    headerBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 180,

    },
    backgroundImage: {
        width: "100%",
        height: "100%",

    },
    //   headerContent: {
    //     // marginRight: 12,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginTop: 45,
    //   },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,

    },
    //   avatar: {
    //     width: 32,
    //     height: 32,
    //     borderRadius: 16,
    //     backgroundColor: '#EFEAD6',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   },
    avatarText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 12,
    },
    headerRight: {
        flexDirection: 'row',
    },
    //   headerTitle: {
    //     fontFamily: Fonts.Montserrat.SemiBold,
    //     fontSize: 16,
    //     color: '#333',
    //     paddingHorizontal: 16,
    //     paddingVertical: 12,

    //   },
    dropdown: {
        backgroundColor: 'white',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 8,
        minHeight: 40,
        width: 140,
    },
    dropdownText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    dropdownContainer: {
        backgroundColor: 'white',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 8,
        maxHeight: 200,
        maxWidth: 125,
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
    tickIcon: {
        width: 16,
        height: 16,
    },
});