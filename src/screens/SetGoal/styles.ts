import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAF5', padding: 24, justifyContent: 'center' },
    image: { width: 110, height: 141, resizeMode: 'contain', alignSelf: 'center', marginBottom: 30 },
    title: { fontSize: 25, fontFamily: 'Montserrat-Bold', marginBottom: 12, textAlign: 'center' },
    label: { fontSize: 15, fontFamily: 'Montserrat-Regular', marginBottom: 24, textAlign: 'center' },
    button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 24, alignItems: 'center', marginTop: 60 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    ticksContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, marginTop: 8 },
    tickColumn: { alignItems: 'center' },
    tickLabel: { marginTop: 8, color: '#6B7280' },
    tickLabelActive: { color: '#111', fontWeight: '700' },
});
