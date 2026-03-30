import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { QuizBackground } from "./components/ui/QuizBackground";
import { quizStyles } from "../assets/style/quiz.styles";

export default function QuizPage() {
  const { series } = useLocalSearchParams<{ series?: string }>();

  const seriesNumber = useMemo(() => {
    if (!series) return null;
    const n = Number(series);
    if (!Number.isInteger(n)) return null;
    if (n < 1 || n > 3) return null;
    return n;
  }, [series]);

  return (
    <QuizBackground>
      <SafeAreaView style={quizStyles.container}>
        <Text style={quizStyles.title}>
          {seriesNumber ? `Série ${seriesNumber}` : "Série inconnue"}
        </Text>
      </SafeAreaView>
    </QuizBackground>
  );
}

