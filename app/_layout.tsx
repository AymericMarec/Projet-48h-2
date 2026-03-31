import { Stack } from "expo-router";
import { QuizProvider } from "./context/quizContext";
import MusicPlayer from "@/app/components/sound/MusicPlayer";
<<<<<<< Updated upstream
=======

void SplashScreen.preventAutoHideAsync();
>>>>>>> Stashed changes

export default function RootLayout() {

  return (
  <QuizProvider>
    <MusicPlayer/>
    <Stack screenOptions={{ headerShown: false }} />
<<<<<<< Updated upstream
=======
    <Stack screenOptions={{ headerShown: false, animation: "none" }} />
>>>>>>> Stashed changes
  </QuizProvider>
  );
}
