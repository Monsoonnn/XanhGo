
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
  title: string;
  icon: string;
};


export default function CardItem({title, icon}: Props) {
  return (
    <TouchableOpacity style={styles.card}>
      <Icon name={icon} size={28} color="#4a90e2" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "47%",
    height: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
  },
});
