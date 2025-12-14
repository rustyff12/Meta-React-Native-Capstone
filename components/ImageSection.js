import { View, Text, Image, Button, Alert, StyleSheet } from "react-native";
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
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>{getInitials()}</Text>
          </View>
        )}
      </View>
      <View style={styles.btnContainer}>
        <Button title="Change" onPress={pickImage} />
        <Button title="Remove" onPress={removeImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 20,
  },
  initialsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  initialsText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  image: { width: "100%", height: "100%" },
  btnContainer: { flexDirection: "row", gap: 10 },
});
