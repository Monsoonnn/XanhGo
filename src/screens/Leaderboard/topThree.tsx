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
import { Tree } from 'iconsax-react-native';



const topThreeData = [
    { id: 1, name: 'Erik', points: 123, position: 1, color: '#028961', crown: true },
    { id: 2, name: 'Erik', points: 123, position: 2, color: '#FFB6C1' },
    { id: 3, name: 'Erik', points: 123, position: 3, color: '#BEDEAB' },
];

const RenderTopThree = () => {
    return (
        <View style={styles.topThreeContainer}>
            {/* Position 3 */}
            <View style={[styles.podium, { backgroundColor: topThreeData[2].color }]}>
                <View style={[styles.profileWinner, { top: -60 }]}>
                    <View style={styles.avatar}>
                        <Icon name="person" size={28} color="#028961" />
                    </View>
                    <View style={[styles.podiumPoints, { flexDirection: 'row', alignItems: 'center'}]}>
                        <Tree size={12} />
                        <Text style={styles.rankingPoints}>{topThreeData[2].points}</Text>
                    </View>
                </View>
                <Text style={styles.podiumNumber}>{topThreeData[2].position}</Text>
                {/* <Text style={styles.podiumName}>{topThreeData[2].name}</Text>
          <Text style={styles.podiumPoints}>{topThreeData[2].points} điểm Xanh</Text> */}
            </View>

            {/* Position 1 - Winner */}
            <View style={[styles.podium, styles.winnerPodium, { backgroundColor: topThreeData[0].color }]}>
                <View style={styles.profileWinner}>
                    <Image
                        source={require('../../assets/icons/crown.png')}
                        style={styles.crown}
                    />

                    <View style={styles.avatar}>
                        <Icon name="person" size={28} color="#028961" />
                    </View>

                    <View style={[styles.podiumPoints, { flexDirection: 'row', alignItems: 'center'}]}>
                        <Tree size={12} />
                        <Text style={styles.rankingPoints}>{topThreeData[0].points}</Text>
                    </View>

                </View>
                <Text style={[styles.podiumNumber]}>{topThreeData[0].position}</Text>
                {/* <Text style={styles.podiumName}>{topThreeData[0].name}</Text>
          <Text style={styles.podiumPoints}>{topThreeData[0].points} điểm Xanh</Text> */}
            </View>

            {/* Position 2 */}
            <View style={[styles.podium, { backgroundColor: topThreeData[1].color, paddingVertical: 15 }]}>
                <View style={[styles.profileWinner, { top: -60 }]}>
                    <View style={styles.avatar}>
                        <Icon name="person" size={28} color="#028961" />
                    </View>
                    <View style={[styles.podiumPoints, { flexDirection: 'row', alignItems: 'center'}]}>
                        <Tree size={12} />
                        <Text style={styles.rankingPoints}>{topThreeData[1].points}</Text>
                    </View>
                </View>
                <Text style={styles.podiumNumber}>{topThreeData[1].position}</Text>
                {/* <Text style={styles.podiumName}>{topThreeData[1].name}</Text>
          <Text style={styles.podiumPoints}>{topThreeData[1].points} điểm Xanh</Text> */}
            </View>
        </View>
    );
};

export default RenderTopThree;