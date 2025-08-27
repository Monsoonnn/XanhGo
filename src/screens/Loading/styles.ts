import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFDF3', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
    titleBox: { alignItems: 'flex-start', marginBottom: 5 },
    titleBig: { fontSize: 75, lineHeight: 84, fontWeight: '900', letterSpacing: 1, color: '#0F1720' },
    rabbit: { width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center' },
    pager: { flexDirection: 'row', marginTop: 8, alignItems: 'center', justifyContent: 'center' },
    // loadingRow is absolutely positioned so you can control distance from bottom
    loadingRow: { position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
    dotLoader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    dot: { width: 10, height: 10, borderRadius: 10, backgroundColor: '#262626', marginHorizontal: 2 },
    dotActive: { backgroundColor: '#9CA3AF', width: 10, height: 10 },
    lineRow: { flexDirection: 'row', alignItems: 'center' },
    carrot: { width: 35, height: 35, marginLeft: 8, resizeMode: 'contain' },
    butterfly: { width: 50, height: 50, marginLeft: 8, resizeMode: 'contain' },
});