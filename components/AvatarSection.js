import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useProfileAvatar } from "../hooks/useProfileAvatar";

export default function AvatarSection() {
  const { image, pickImage, removeImage, getInitials, hasImage } =
    useProfileAvatar();

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarPreview}>
        {hasImage ? (
          <Image source={{ uri: image }} style={styles.largeAvatar} />
        ) : (
          <View style={styles.largeInitials}>
            <Text style={styles.largeInitialsText}>{getInitials()}</Text>
          </View>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.btnContainer}>
        <Pressable style={styles.changeBtn} onPress={pickImage}>
          <Text style={styles.btnText}>Change</Text>
        </Pressable>
        <Pressable style={styles.removeBtn} onPress={removeImage}>
          <Text style={styles.btnText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  avatarPreview: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
    width: "100%",
    height: "100%",
    backgroundColor: "#495E57",
    justifyContent: "center",
    alignItems: "center",
  },
  largeInitialsText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  // Buttons
  btnContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    marginBottom: 10,
  },
  changeBtn: {
    backgroundColor: "#495E57",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  removeBtn: {
    backgroundColor: "#F4CE14",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
