import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import BackArrow from "../assets/back-arrow.png";
import Logo from "../assets/logo.png";
import ProfileImage from "../assets/Profile.png";
export default function Profile() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Pressable style={styles.backBtn}>
            <Image style={styles.backBtnImage} source={BackArrow} />
          </Pressable>
          <Image style={styles.headerLogo} source={Logo} />
          <Image style={styles.profileImage} source={ProfileImage} />
        </View>
        {/* Body */}
        {/* <View style={styles.bodyContainer}>
          <Text style={styles.personalHeader}>Personal Information</Text>
          <View>
            <View>
              <Text>Avatar</Text>
              <Image style={styles.personalImage} source={ProfileImage} />
            </View>
            <View style={styles.avatarBtnContainer}>
              <Pressable style={styles.changeBtn}>
                <Text style={styles.changeBtnText}>Change</Text>
              </Pressable>
              <Pressable style={styles.removeBtn}>
                <Text style={styles.removeBtnText}>Remove</Text>
              </Pressable>
            </View>
          </View>
        </View> */}
        {/* Personal information */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "white",
  },
  text: {
    color: "black",
  },
  // Header
  headerContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    // backgroundColor: "red",
    height: 100,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#495E57",
    justifyContent: "center",
    alignItems: "center",
  },
  backBtnImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  headerLogo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
  },
  // Body
  bodyContainer: {
    borderWidth: 1,
    borderColor: "black",
  },
});
