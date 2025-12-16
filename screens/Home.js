import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/Header";
import HomeHero from "../components/HomeHero";
import Delivery from "../components/Delivery";
export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header showBack={false} />
        <HomeHero />
        <Delivery />
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
