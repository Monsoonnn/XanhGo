import { TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from "./styles";

const BottomBar = () => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="home" size={24} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="star-border" size={24} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="notifications" size={24} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="person" size={24} color="#999" />
      </TouchableOpacity>
    </View>
  );
}

export default BottomBar;
