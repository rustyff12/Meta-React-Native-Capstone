import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Images } from "../assets/images";
import { useProfileAvatar } from "../hooks/useProfileAvatar";
import { useNavigation } from "@react-navigation/native";

export default function Header({ showBack = true, showAvatar = true }) {
  const { image, getInitials, hasImage } = useProfileAvatar();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate("Home");
  };

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftColumn}>
        {showBack && (
          <Pressable style={styles.backContainer} onPress={handleBack}>
            <Image style={styles.backImage} source={Images.back} />
          </Pressable>
        )}
      </View>

      <View style={styles.middleColumn}>
        <Image style={styles.logo} source={Images.logo} />
      </View>

      <View style={styles.rightColumn}>
        {showAvatar && (
          <Pressable onPress={handleProfile} style={styles.avatarPreview}>
            {hasImage ? (
              <Image source={{ uri: image }} style={styles.largeAvatar} />
            ) : (
              <View style={styles.largeInitials}>
                <Text style={styles.largeInitialsText}>{getInitials()}</Text>
              </View>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },

  leftColumn: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  middleColumn: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  rightColumn: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  backContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 20,
  },
  backImage: {
    width: "100%",
    height: "100%",
  },
  logo: { width: 150, height: 70, objectFit: "contain", marginBottom: 10 },
  avatarPreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#D9D9D9",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  largeAvatar: {
    width: "100%",
    height: "100%",
  },
  largeInitials: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#495E57",
    justifyContent: "center",
    alignItems: "center",
  },
  largeInitialsText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});
