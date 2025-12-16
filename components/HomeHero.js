import { View, Text, StyleSheet, Image } from "react-native";
import { Images } from "../assets/images";
import { Fonts } from "../assets/fonts";

export default function HomeHero() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Little Lemon</Text>
      <View style={styles.mainContent}>
        <View style={styles.textContent}>
          <Text style={styles.subHeader}>Chicago</Text>
          <Text style={styles.introText}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={Images.hero} style={styles.heroImage} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#495E57",
    padding: 20,
  },
  header: {
    fontSize: 54,
    color: "#F4CE14",
    fontFamily: Fonts.markaziBold,
  },
  mainContent: {
    flexDirection: "row",
    gap: 10,
  },
  textContent: {
    gap: 12,
    flex: 1.2,
  },
  subHeader: {
    fontSize: 36,
    color: "#EDEFEE",
    fontFamily: Fonts.markaziRegular,
  },
  introText: {
    fontSize: 16,
    color: "#EDEFEE",
    fontFamily: Fonts.regular,
  },
  imageContainer: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: 125,
    height: 160,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
