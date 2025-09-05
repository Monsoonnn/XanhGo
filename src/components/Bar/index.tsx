import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { styles } from '../../screens/HistoryTree/styles';

const Bar = ({ valuePercent, color, day, isToday, onPressIn, onPressOut }: { valuePercent: number; color: string; day: string; isToday?: boolean; onPressIn?: (e: any) => void; onPressOut?: () => void }) => (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} style={styles.barItem}>
        <View style={[
            styles.bar,
            { height: `${valuePercent}%`, backgroundColor: color },
            isToday ? { borderWidth: 1, borderColor: '#333' } : {}
        ]} />
        <Text style={styles.barLabel}>{day}</Text>
    </Pressable>
);

export default React.memo(Bar);
