import { TickCircle } from "iconsax-react-native";
import { StyleSheet } from "react-native";
import Fonts from "../../constants/font";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFDF3',
        flex: 1,
        alignItems: 'center',
    },
    title: {
        width: 216,
        textAlign: 'center',
        fontSize: 24,
        fontFamily: Fonts.DelaGothicOne,
        color: '#028961',
        fontWeight: '400',
        lineHeight: 36,
        marginTop: 4,
    },
    qrCode: {
        width: 280,
        height: 280,
        display: 'flex',
        padding: 2,
        marginTop: 36,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 21,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        backgroundColor: '#fff'
    },
    description: {
        marginTop: 36,
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        width: 250,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    descriptionText: {
        color: '#262626',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        fontFamily: Fonts.Montserrat.Regular,
    },
    name: {
        color: '#028961',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
        fontFamily: Fonts.Montserrat.Medium,
    },
    number: {
        color: '#262626',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
        fontFamily: Fonts.Montserrat.Medium,
    },
    button: {
        marginTop: 36,
        width: 280,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 360,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        fontFamily: Fonts.Montserrat.Medium,
        color: '#262626',
        marginLeft: 8,
    },
});