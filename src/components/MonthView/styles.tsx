import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    calendarHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 },
    calendarHeaderText: { width: 32, textAlign: 'center', color: '#666' },
    calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
    calendarCell: { width: `${100 / 7}%`, alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4 },
    calendarCellEmpty: { width: `${100 / 7}%`, height: 48, alignItems: 'center', justifyContent: 'center' },
    dayCircle: { width: 41, height: 41, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    todayCircle: { borderWidth: 1, borderColor: '#333' },
    dayNumber: { fontSize: 14 },
    scoreNavRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
    scoreCard: { flex: 1, alignItems: 'center' },
    navBtn: { padding: 8 },
    scoreText: { fontSize: 16, fontWeight: '600', color: '#111' },
    scoreRange: { fontSize: 12, color: '#666' }
});