import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    plantRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    plantLeft: { flexDirection: 'row', alignItems: 'center' },
    plantIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eee', marginRight: 12 },
    plantTextWrap: { flexDirection: 'column' },
    plantWhen: { fontSize: 12, color: '#666' },
    plantName: { fontSize: 16, color: '#111' },
    plantRight: {},
    claimBtn: { backgroundColor: '#3CB371', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
    claimBtnText: { color: '#fff' },
    claimedBtn: { backgroundColor: '#ECECEC', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
    claimedBtnText: { color: '#999' },
});
