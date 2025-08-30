import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import CircularProgress from '../CircularProgress';
import { styles } from './styles';
import { DotOutlineIcon } from 'phosphor-react-native';

type DayItemProps = {
    day: number;
    isToday: boolean;
    isPastDay: boolean;
    isCompleted?: boolean;
    percentage?: number;
    onPress?: () => void;
};

const DayItem = ({
    day,
    isToday,
    isPastDay,
    isCompleted = false,
    percentage = 0,
    onPress
}: DayItemProps) => {
    if (isPastDay) {
        return (
            <TouchableOpacity style={styles.dayContainer} onPress={onPress}>
                <CircularProgress
                    percentage={percentage}
                    isCompleted={isCompleted}
                    size={32}
                    isCompletedColor='black'
                    strokeWidth={2}
                />
            </TouchableOpacity>
        );
    }

    if (isToday) {
        return (
            <TouchableOpacity style={styles.dayContainer} onPress={onPress}>
                <View style={styles.todayContainer}>
                    <Text style={styles.todayText}>{day}</Text>
                    <DotOutlineIcon size={10} color={'white'} weight="fill"  />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={styles.dayContainer} onPress={onPress}>
            <DotOutlineIcon size={24} color={isCompleted ? "#4CAF50" : "black"} weight="fill"  />
        </TouchableOpacity>
    );
};
export default DayItem;