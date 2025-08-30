import { StyleSheet } from "react-native";
import Fonts from "../../constants/font";

export const styles = StyleSheet.create({
    // CircularProgress styles
    progressContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressSvg: {
        position: 'absolute',
    },
    checkmarkContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Calendar styles
    calendarContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        margin: 16,
    },
    weekDaysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        gap: 20,
    },
    weekDayText: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: Fonts.Montserrat.Medium,
        width: 32,
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'start',
        gap: 20,
    },
    dayContainer: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',

    },
    todayContainer: {
        width: 38,
        height: 38,
        backgroundColor: '#000000',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    todayText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    dayText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    otherMonthText: {
    fontSize: 14,
    color: '#D1D5DB',
    fontWeight: '400',
  },
});
