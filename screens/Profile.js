import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import AvatarSection from "../components/AvatarSection";
import EditProfileForm from "../components/EditProfileForm";

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contentWrapper}>
          <Text style={styles.avatarLabel}>Avatar</Text>
          <AvatarSection />

          <EditProfileForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 80,
  },
  contentWrapper: {
    borderColor: "#333333ff",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  avatarLabel: {
    color: "#333333ff",
    fontSize: 14,
    marginBottom: 10,
  },
});
