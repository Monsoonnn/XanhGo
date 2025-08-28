import { StyleSheet } from "react-native";
import Fonts from "../../constants/font";

export const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 24,
        left: 16,
        zIndex: 10,
    },
    backCircle: {
        width: 40,
        height: 40,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    container: {
        flex: 1,
        backgroundColor: '#FAFDF3',
        padding: 24,
    },
    title: {
        fontSize: 32,
        marginBottom: 12,
        fontFamily: Fonts.DelaGothicOne,
    },
    label: {
        fontSize: 16,
        marginBottom: 16,
        color: '#5D5D5D',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    countrySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#5D5D5D',
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginRight: 8,
        minWidth: 90,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    flag: {
        fontSize: 20,
        marginRight: 8,
    },
    prefix: {
        fontSize: 16,
        marginRight: 4,
    },
    arrow: {
        fontSize: 16,
        color: '#666'
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        left: 0,
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#5D5D5D',
        zIndex: 1000,
        maxHeight: 200,
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#5D5D5D',
    },
    countryName: {
        marginLeft: 8,
        fontSize: 16,
    },
    phoneInput: {
        borderWidth: 1,
        borderColor: '#5D5D5D',
        borderRadius: 24,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: '#fff',
        fontSize: 17,
    },
    clearButton: {
        position: 'absolute',
        right: 13,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
    termsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    desc: {
        flex: 1,
        fontSize: 12,
        color: '#5D5D5D',
        fontFamily: 'font'
    },
    link: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#262626'
    },
    button: {
        backgroundColor: '#29B26B',
        padding: 16,
        borderRadius: 24,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})