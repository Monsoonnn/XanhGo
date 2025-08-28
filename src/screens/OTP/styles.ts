import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFDF3', paddingHorizontal: 24 },
    backButton: {
        position: 'absolute',
        top: 24,
        left: 16,
        zIndex: 10,
    },
    backCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    backArrow: {
        fontSize: 22,
        color: '#333',
        fontWeight: 'bold',
    },
    centerBox: {
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 16,
    },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
    label: { fontSize: 16, marginBottom: 8, color: '#5D5D5D', textAlign: 'left' },
    otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    otpInput: { width: 43.83, height: 56, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, textAlign: 'center', fontSize: 20, backgroundColor: '#fff' },
    resend: { marginBottom: 24 },
    resendText: { color: '#525252', fontSize: 16, textAlign: 'center', textDecorationLine: 'underline' },
    button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 24, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    otpImage: { width: 80, height: 80, resizeMode: 'contain', alignSelf: 'center', marginBottom: 30 },
});