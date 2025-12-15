import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/Header";
export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header showBack={false} />
        <View style={styles.content}>
          <Text>Home</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
