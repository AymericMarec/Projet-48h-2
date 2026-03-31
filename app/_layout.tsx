import { Stack } from "expo-router";
import { QuizProvider } from "./context/quizContext";
import MusicPlayer from "@/app/components/sound/MusicPlayer";

export default function RootLayout() {

  return (
  <QuizProvider>
    <MusicPlayer/>
    <Stack screenOptions={{ headerShown: false }} />
  </QuizProvider>
  );
}
