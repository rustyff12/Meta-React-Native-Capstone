import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import { Images } from "./assets/images";
import { View, StyleSheet } from "react-native";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import SplashScreen from "./screens/SplashScreen";
import Home from "./screens/Home";
import { UserProvider } from "./context/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        await Asset.loadAsync([Images.logo, Images.back]);

        const storedData = await AsyncStorage.getItem("userData");
        if (storedData) {
          const user = JSON.parse(storedData);
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error("Error during app initialization:", error);
        setIsSignedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    initApp();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.appContainer}>
      <SafeAreaProvider>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={isSignedIn ? "Home" : "Onboarding"}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#EDEFEE",
  },
});
