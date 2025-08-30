import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import CircularProgress from '../CircularProgress';
import { styles } from './styles';
import DayItem from './dayItem';
import { DotOutlineIcon } from 'phosphor-react-native';

type CalendarProps = {
    currentDate?: Date;
    completedDays?: { [key: number]: { completed: boolean; percentage: number } };
    onDayPress?: (day: number) => void;
};

const Calendar = ({ 
  currentDate = new Date(), 
  completedDays = completedDaysEx,
  onDayPress 
}: CalendarProps) => {
  const today = 11;
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const renderCalendarDays = () => {
    const days = [];
    
    // Get previous month info
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    
    // Add days from previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <TouchableOpacity key={`prev-${day}`} style={styles.dayContainer}>
           <DotOutlineIcon size={24} color={'#D1D5DB'} weight="fill"  />
        </TouchableOpacity>
      );
    }
    
    // Add actual days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today;
      const isPastDay = day < today;
      const dayData = completedDays[day] || { completed: false, percentage: 0 };
      
      days.push(
        <DayItem
          key={day}
          day={day}
          isToday={isToday}
          isPastDay={isPastDay}
          isCompleted={dayData.completed}
          percentage={dayData.percentage}
          onPress={() => onDayPress?.(day)}
        />
      );
    }
    
    // Add days from next month to fill the grid (42 cells total = 6 weeks * 7 days)
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <TouchableOpacity key={`next-${day}`} style={styles.dayContainer}>
            <DotOutlineIcon size={24} color={'#D1D5DB'} weight="fill"  />
        </TouchableOpacity>
      );
    }
    
    return days;
  };

    return (
        <View style={styles.calendarContainer}>
            {/* Week day headers */}
            <View style={styles.weekDaysContainer}>
                {weekDays.map((day, index) => (
                    <Text key={index} style={styles.weekDayText}>
                        {day}
                    </Text>
                ))}
            </View>

            {/* Calendar grid */}
            <View style={styles.calendarGrid}>
                {renderCalendarDays()}
            </View>
        </View>
    );
};

export default Calendar;

const completedDaysEx = {
        1: { completed: true, percentage: 100 },
        2: { completed: true, percentage: 100 },
        3: { completed: false, percentage: 60 },
        4: { completed: true, percentage: 100 },
        5: { completed: false, percentage: 30 },
        6: { completed: true, percentage: 100 },
        7: { completed: false, percentage: 80 },
        8: { completed: true, percentage: 100 },
        9: { completed: false, percentage: 45 },
        10: { completed: true, percentage: 100 },
};

