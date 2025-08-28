import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomBar from '../../components/BottomBar';

import { styles } from './styles';
import { Minus, Tree } from 'iconsax-react-native';

type RankingProps = {
  item: {
    id: number;
    name: string;
    points: number;
    position: number;
    change: number;
  };
};

const RankingUser: React.FC<RankingProps> = ({ item }) => {
    return (
      <View key={item.id} style={styles.rankingItem}>
        <Text style={styles.rankingPosition}>{item.position}</Text>

        <View style={styles.avatarSmall}>
          <Icon name="person" size={18} color="#028961" />
        </View>

        <View style={styles.rankingInfo}>
          
          <Text style={styles.rankingName}>{item.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 2}}>
            <Image source={require('../../assets/icons/tree-deciduous.png')} style={{width: 15,height: 15}} />
            <Text style={styles.rankingPoints}>{item.points} điểm Xanh</Text>
          </View>
        </View>

        <View style={styles.changeContainer}>
          {item.change > 0 ? (
            <View style={styles.changeUp}>
              <Text style={styles.changeText}>+{item.change}</Text>
              <Icon name="caret-up" size={24} color="#32CD32" />
            </View>
          ) : item.change < 0 ? (
            <View style={styles.changeDown}>
              <Text style={styles.changeText}>{item.change}</Text>
              <Icon name="caret-down" size={24} color="#FF4444" />
            </View>
          ) : (
            <View style={styles.changeNeutral}>
              <Minus size={24} color="#333" />
            </View>
          )}
        </View>
      </View>
    );
  };

export default RankingUser;