import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { QuizProvider } from "./context/quizContext";
import MusicPlayer from "@/app/components/sound/MusicPlayer";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "CabinetGrotesk-Regular": require("../assets/fonts/cabinet-grotesk/CabinetGrotesk_Complete/Fonts/OTF/CabinetGrotesk-Regular.otf"),
    "CabinetGrotesk-Medium": require("../assets/fonts/cabinet-grotesk/CabinetGrotesk_Complete/Fonts/OTF/CabinetGrotesk-Medium.otf"),
    "CabinetGrotesk-Bold": require("../assets/fonts/cabinet-grotesk/CabinetGrotesk_Complete/Fonts/OTF/CabinetGrotesk-Bold.otf"),
    "CabinetGrotesk-Extrabold": require("../assets/fonts/cabinet-grotesk/CabinetGrotesk_Complete/Fonts/OTF/CabinetGrotesk-Extrabold.otf"),
    "CabinetGrotesk-Light": require("../assets/fonts/cabinet-grotesk/CabinetGrotesk_Complete/Fonts/OTF/CabinetGrotesk-Light.otf"),
    "CabinetGrotesk-Extralight": require("../assets/fonts/cabinet-grotesk/CabinetGrotesk_Complete/Fonts/OTF/CabinetGrotesk-Extralight.otf"),
  });

  useEffect(() => {
    if (!fontsLoaded) return;

    void SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
  <QuizProvider>
    <MusicPlayer/>
    <Stack screenOptions={{ headerShown: false, animation: "none" }} />
  </QuizProvider>
  );
}
