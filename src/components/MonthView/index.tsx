import React from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type Cell = { dateStr?: string; dayNum?: number };

const MonthView = ({ monthData, data, onDayPress, prevMonth, nextMonth, monthOffset, todayStr }: { monthData: { cells: Cell[]; lastDay: number; month: number; total: number }, data: any[], onDayPress: any, prevMonth: any, nextMonth: any, monthOffset: number, todayStr: string }) => {
    const { cells, lastDay, month, total: monthTotal } = monthData;
    return (
        <>
            <View style={styles.calendarHeaderRow}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((s, i) => (
                    <Text key={`${s}-${i}`} style={styles.calendarHeaderText}>{s}</Text>
                ))}
            </View>
            <View style={styles.calendarGrid}>
                {cells.map((c: Cell, i: number) => {
                    if (!c.dateStr) return <View key={i} style={styles.calendarCellEmpty} />;
                    const entry = data.find((x: any) => x.date === c.dateStr);
                    const isPastOrToday = c.dateStr <= todayStr;
                    const color = entry && isPastOrToday ? (entry.status === 'Đạt' ? '#29B26B' : '#F6B9D4') : '#ECECEC';
                    return (
                        <Pressable key={i} style={styles.calendarCell} onPress={(e) => onDayPress(e.nativeEvent, c.dateStr!, entry?.value ?? 0)}>
                            <View style={[styles.dayCircle, { backgroundColor: color }, c.dateStr === todayStr ? styles.todayCircle : {}]}>
                                <Text style={styles.dayNumber}>{c.dayNum}</Text>
                            </View>
                        </Pressable>
                    );
                })}
            </View>
            <View style={styles.scoreNavRow}>
                <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
                    <Text>{'<'}</Text>
                </TouchableOpacity>
                <View style={styles.scoreCard}>
                    <Text style={styles.scoreText}>{monthTotal} điểm Xanh</Text>
                    <Text style={styles.scoreRange}>1 tháng {month + 1} - {lastDay} tháng {month + 1}</Text>
                </View>
                <TouchableOpacity onPress={nextMonth} style={[styles.navBtn, monthOffset === 0 ? { opacity: 0.3 } : null]} disabled={monthOffset === 0}>
                    <Text>{'>'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default React.memo(MonthView);
