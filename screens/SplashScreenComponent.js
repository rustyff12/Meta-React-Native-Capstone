import { View, Text, Image, StyleSheet } from "react-native";
import { Images } from "../assets/images";
export default function SplashScreenComponent() {
  return (
    <View style={styles.splashContainer}>
      <Image style={styles.splashImage} source={Images.logo} />
      <Text style={styles.splashText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage: {
    width: 230,
    height: 100,
    resizeMode: "contain",
  },
  splashText: {
    fontSize: 24,
    fontWeight: 700,
  },
});
