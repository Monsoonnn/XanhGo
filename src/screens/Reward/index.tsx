import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

import styles from './styles';
import CircularProgress from '../../components/CircularProgress';
import { useNavigation } from '@react-navigation/native';


const RewardScreen = () => {
  // Example progress data
  const progressData = [
    { percentage: 100, isCompleted: true },
    { percentage: 100, isCompleted: true },
    { percentage: 60, isCompleted: false },
    { percentage: 100, isCompleted: true },
    { percentage: 40, isCompleted: false },
    { percentage: 100, isCompleted: true },
    { percentage: 100, isCompleted: true }
  ];

  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* Close button */}
      <TouchableOpacity style={styles.closeButton} onPressOut={() => navigation.goBack()}>
        <Icon name="x" size={20} color="white" />
      </TouchableOpacity>

      {/* Main content */}
      <View style={styles.content}>
        {/* Reward card */}
        <View style={styles.card}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/logo/XanhGo_2.png')}  />
          </View>

          {/* Trophy with confetti */}
          <Image source={require('../../assets/images/trophy.png')} style={styles.trophy} />

          {/* Progress circles */}
          <View style={styles.progressRow}>
            {progressData.map((item, index) => (
              <CircularProgress 
                key={index}
                percentage={item.percentage}
                isCompleted={item.isCompleted}
              />
            ))}
          </View>

          {/* Title and description */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Chuỗi 7 ngày</Text>
            <Text style={styles.description}>
              Quá đỉnh! Bạn đã thực hiện được{'\n'}
              7 ngày giảm thiểu carbon!
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share-2" size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="download" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



export default RewardScreen;