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
import RenderTopThree from './topThree';
import RankingUser from './otherRanking';
import { DirectInbox } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';

const Leaderboard = () => {

  const otherRankings = [
    { id: 4, name: 'Erik', points: 123, position: 4, change: 0 },
    { id: 5, name: 'Erik', points: 123, position: 5, change: -2 },
    { id: 6, name: 'Erik', points: 123, position: 6, change: 1 },
    { id: 7, name: 'Erik', points: 123, position: 7, change: 1 },
    { id: 8, name: 'Erik', points: 123, position: 8, change: -2 },
    { id: 9, name: 'Erik', points: 123, position: 9, change: 1 },
    { id: 10, name: 'Erik', points: 123, position: 10, change: 0 },
    { id: 11, name: 'Erik', points: 123, position: 11, change: 0 },
    { id: 12, name: 'Erik', points: 123, position: 12, change: 0 },
  ];

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bảng xếp hạng</Text>
        <TouchableOpacity onPressOut={() => navigation.navigate('Reward')}>
          <DirectInbox
            size="24"
            // color="#FF8A65"
            variant="Outline"
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Top 3 Podium */}
        <RenderTopThree />

        {/* Other Rankings */}
        <View style={styles.rankingList}>
          {otherRankings.map((user) => (
            <RankingUser key={user.id} item={user} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomBar leaderboard />
    </View>
  );
};



export default Leaderboard;