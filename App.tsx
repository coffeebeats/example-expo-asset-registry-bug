/**
 * NOTE: This file is copied directly from https://docs.expo.dev/versions/latest/sdk/font/#usage.
 * The only modifications are (1) destructuring `error` from the return value of `useFonts` to log
 * any issues with font loading and (2) changing the extension of the font file.
 */

import { useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    // Switched extension to 'ttf'; downloaded from https://fonts.google.com/specimen/Inter
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
  });

  // added logging here to highlight the issue
  if (error) {
    console.error(error);
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={{ fontFamily: "Inter-Black", fontSize: 30 }}>
        Inter Black
      </Text>
      <Text style={{ fontSize: 30 }}>Platform Default</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
