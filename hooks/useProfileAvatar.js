import { useUser } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking, Platform } from "react-native";

export function useProfileAvatar() {
  const { image, setImage, fname, lname } = useUser();

  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "You need to grant permission to select a photo.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Open Settings",
            onPress: () => {
              if (Platform.OS === "ios") {
                Linking.openURL("app-settings:");
              }
            },
          },
        ]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
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

  return {
    image,
    pickImage,
    removeImage,
    getInitials,
    hasImage: !!image,
  };
}
