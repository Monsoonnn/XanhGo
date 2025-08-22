import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";


export default function SplashScreen() {
    
    return(
        <View style={styles.sectionContainer}>
            <Text>Splash</Text>
        </View>
    )


}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});