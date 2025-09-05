import { StyleSheet } from "react-native";
import Fonts from "../../constants/font";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#FAFDF3"
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        lineHeight: 36,
        fontFamily: Fonts.DelaGothicOne,
        color: '#262626',
        marginTop: 6
    },
    parent: {
        flex: 1
    },
    viewFlexBox: {
        alignItems: "center",
        flexDirection: "row"
    },
    gnYFlexBox: {
        textAlign: "left",
        color: "#262626",
        flex: 1
    },
    view: {
        width: "100%",
        justifyContent: "space-between",
        gap: 0,
        flex: 1
    },
    gnY: {
        fontSize: 24,
        lineHeight: 36,
        fontFamily: Fonts.DelaGothicOne
    },
    dropdown: {
        width: 87,
        borderRadius: 40
    },
    main: {
        alignSelf: "stretch"
    },
    textfield: {
        borderRadius: 360,
        borderStyle: "solid",
        borderColor: "#e5e5e5",
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 4,
        gap: 8,
        alignSelf: "stretch"
    },
    hintText: {
        fontSize: 12,
        letterSpacing: 0.1,
        lineHeight: 16,
        fontFamily: Fonts.Montserrat.Regular
    },
    chevronDownIcon: {
        width: 20,
        height: 20
    }
    ,
    chartWrap: {
        marginTop: 8,
        marginBottom: 16
    },
    barsRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        height: 160
    },
    barItem: {
        alignItems: 'center',
        width: 28
    },
    bar: {
        width: 42,
        borderRadius: 12
    },
    barLabel: {
        fontSize: 12,
        marginTop: 8,
        color: '#86D3A6'
    },
    scoreCard: {
        marginTop: 12,
        backgroundColor: '#FAFFF8',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center'
    },
    scoreText: {
        fontSize: 16,
        color: '#262626',
        fontFamily: Fonts.Montserrat.SemiBold
    },
    scoreRange: {
        fontSize: 12,
        color: '#8F8F8F',
        marginTop: 4
    },
    sectionTitle: {
        fontSize: 20,
        color: '#262626',
        marginTop: 18,
        marginBottom: 12,
        fontFamily: Fonts.DelaGothicOne
    },
    plantRow: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    plantLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    plantIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#EFEAD6',
        marginRight: 12

    },
    plantTextWrap: {
        justifyContent: 'center'
    },
    plantWhen: {
        fontSize: 12,
        color: '#9A9A9A'
    },
    plantName: {
        fontSize: 16,
        color: '#262626',
        marginTop: 4,
        fontFamily: Fonts.Montserrat.SemiBold
    },
    plantRight: {
        justifyContent: 'center'
    },
    claimBtn: {
        backgroundColor: '#3CB371',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20
    },
    claimBtnText: {
        color: '#FFFFFF',
        fontSize: 14
    },
    claimedBtn: {
        backgroundColor: '#F1F1F1',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20
    },
    claimedBtnText: {
        color: '#B6B6B6'
    }
    ,
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#EFEAD6',
        borderRadius: 24,
        marginHorizontal: 5,
        padding: 4
    },
    tabButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20
    },
    tabActive: {
        backgroundColor: '#FFFFFF'
    },
    tabText: {
        fontSize: 12,
        fontFamily: Fonts.Montserrat.Medium,
        color: '#262626'
    },
    calendarHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        marginBottom: 8
    },
    calendarHeaderText: {
        width: 36,
        textAlign: 'center',
        color: '#9A9A9A'
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    calendarCell: {
        width: `${100 / 7}%`,
        padding: 6,
        alignItems: 'center'
    },
    calendarCellEmpty: {
        width: `${100 / 7}%`,
        padding: 6
    },
    dayCircle: {
        width: 36,
        height: 36,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    todayCircle: {
        borderWidth: 1,
        borderColor: '#333'
    },
    dayNumber: {
        color: '#262626'
    }
    ,
    scoreNavRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    navBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
    ,
    tooltip: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        padding: 8,
        borderRadius: 8,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 }
    },
    tooltipDate: {
        fontSize: 12,
        fontWeight: '600'
    },
    tooltipValue: {
        fontSize: 12,
        color: '#3CB371'
    }
})