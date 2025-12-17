import { useUser } from "../context/UserContext";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

export default function Onboarding() {
  const { fname, setFname, lname, setLname, email, setEmail } = useUser();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isDisabled = !fname || !lname || !emailRegex.test(email);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          {/* Header */}
          <Header showBack={false} showAvatar={false} />

          {/* Hero / Form */}
          <View style={styles.heroContainer}>
            <Text style={styles.heroHeader}>Let us get to know you</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setFname}
                  value={fname}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setLname}
                  value={lname}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setEmail}
                  value={email}
                  keyboardType="email-address"
                />
              </View>
            </View>
          </View>

          {/* Footer / Button */}
          <View style={styles.footer}>
            <Pressable
              style={[styles.btn, isDisabled && styles.btnDisabled]}
              disabled={isDisabled}
              onPress={() => navigation.navigate("Home")}
            >
              <Text
                style={[styles.btnText, isDisabled && styles.btnTextDisabled]}
              >
                Next
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEFEE",
  },

  heroContainer: {
    flex: 7,
    backgroundColor: "#495E57",
    padding: 48,
    paddingHorizontal: 24,
    justifyContent: "space-around",
  },
  heroHeader: {
    fontSize: 30,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 24,
    gap: 16,
  },
  inputWrapper: {
    gap: 20,
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 24,
    fontWeight: "500",
    color: "#333333",
    textAlign: "center",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 8,
    paddingHorizontal: 12,
    width: "80%",
    backgroundColor: "#FFFFFF",
    color: "#333333",
  },
  footer: {
    flex: 2,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  btn: {
    margin: 20,
    paddingVertical: 16,
    paddingHorizontal: 48,
    backgroundColor: "#495E57",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnDisabled: {
    backgroundColor: "#999999",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  btnTextDisabled: {
    color: "#ccc",
  },
});
