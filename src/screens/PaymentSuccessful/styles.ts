import { StyleSheet } from "react-native"
import Fonts from "../../constants/font";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    confettiContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 184,
    },
    title: {
        marginTop: 36,
        alignItems: 'center',
        width: 259,
        marginBottom: 16,
    },
    baseTitle: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: Fonts.DelaGothicOne,
        fontWeight: '400',
        lineHeight: 36,
    },
    titleText: {
        color: '#262626',
    },
    titleName: {
        color: '#29B26B',
    },

    message: {
        fontFamily: Fonts.Montserrat.Regular,
        textAlign: 'center',
        fontSize: 16,
        color: '#525252',
        lineHeight: 20,
        fontWeight: '400',
    },
    button: {
        width: 300,
        marginTop: 86,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 360,
        backgroundColor: '#028961'
    },
    buttonText: {
        fontFamily: Fonts.Montserrat.Medium,
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
    }
})

export default styles;