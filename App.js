import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Images } from "./assets/images";
import { View, StyleSheet } from "react-native";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import SplashScreenComponent from "./screens/SplashScreenComponent";
import Home from "./screens/Home";
import { UserProvider } from "./context/UserContext";

import {
  MarkaziText_400Regular,
  MarkaziText_500Medium,
  MarkaziText_700Bold,
} from "@expo-google-fonts/markazi-text";
import {
  Karla_400Regular,
  Karla_500Medium,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Asset.loadAsync([Images.logo, Images.back, Images.hero]);

        await Font.loadAsync({
          "MarkaziText-Regular": MarkaziText_400Regular,
          "MarkaziText-Medium": MarkaziText_500Medium,
          "MarkaziText-Bold": MarkaziText_700Bold,
          "Karla-Regular": Karla_400Regular,
          "Karla-Medium": Karla_500Medium,
          "Karla-Bold": Karla_700Bold,
        });

        const storedData = await AsyncStorage.getItem("userData");
        if (storedData) {
          setIsSignedIn(true);
        }
      } catch (error) {
        console.error("Error during app initialization:", error);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!appIsReady) {
    return <SplashScreenComponent />;
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
