import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import SplashScreen from "./screens/SplashScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("loginStatus");
        setIsSignedIn(value !== null ? JSON.parse(value) : false);
      } catch (e) {
        console.error("Error loading login status:", e.message);
        setIsSignedIn(false);
      }
    };

    getData();
  }, []);

  if (isSignedIn === null) {
    <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        initialRouteName={isSignedIn ? "Profile" : "Onboarding"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator> */}
      <Stack.Navigator
        initialRouteName={"Profile"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
