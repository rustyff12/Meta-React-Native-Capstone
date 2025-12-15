import { View, Text, Image, Pressable, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "../context/UserContext";

export default function ImageSection() {
  const { image, setImage, fname, lname } = useUser();

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["Image"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => setImage(null);

  const getInitials = () => {
    const firstInitial = fname?.[0]?.toUpperCase() || "";
    const lastInitial = lname?.[0]?.toUpperCase() || "";
    return firstInitial + lastInitial;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainerWrapper}>
        <Text style={styles.avatarText}>Avatar</Text>
        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <View style={styles.initialsContainer}>
              <Text style={styles.initialsText}>{getInitials()}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.btnContainer}>
        <Pressable style={styles.changeBtn} onPress={pickImage}>
          <Text style={styles.changeBtnText}>Change</Text>
        </Pressable>

        <Pressable style={styles.removeBtn} onPress={removeImage}>
          <Text style={styles.removeBtnText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  imageContainerWrapper: {
    gap: 5,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 60,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 20,
  },
  avatarText: {
    color: "black",
    fontSize: 12,
  },
  initialsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  initialsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  image: { width: "100%", height: "100%" },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  changeBtn: {
    backgroundColor: "#495E57",
    borderColor: "#495E57",
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  changeBtnText: {
    color: "white",
    fontWeight: 700,
  },
  removeBtn: {
    backgroundColor: "fff",
    borderColor: "#495E57",
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeBtnText: {
    color: "495E57",
    fontWeight: 700,
  },
});
