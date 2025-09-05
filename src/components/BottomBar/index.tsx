import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Trophy } from 'phosphor-react-native';
import {
  Home,
  Tree,
  Profile
} from 'iconsax-react-native';
import { useNavigation } from "@react-navigation/native";

type Props = {
  home?: boolean;
  profile?: boolean;
  tree?: boolean;
  leaderboard?: boolean;
};

const BottomBar = ({ home, profile, tree, leaderboard }: Props) => {

  const navigation = useNavigation<any>();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => {
        navigation.navigate('Home');
      }}  >
        <Home size={24} color={home ? "#4CAF50" : "#999"} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => {
        navigation.navigate('Leaderboard');

      }}  >
        <Trophy size={24} color={leaderboard ? "#4CAF50" : "#999"} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => {
        navigation.navigate('Tree');
      }}>
        <Tree size={24} color={tree ? "#4CAF50" : "#999"} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => {
        // navigation.navigate('Leaderboard');

      }}  >
        <Profile size={24} color={profile ? "#4CAF50" : "#999"} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
