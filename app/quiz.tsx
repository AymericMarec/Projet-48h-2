import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { quizStyles } from "../assets/style/quiz.styles";

export default function Quiz() {
  const { series } = useLocalSearchParams<{ series?: string }>();

  const seriesNumber = useMemo(() => {
    if (!series) return null;
    const n = Number(series);
    if (!Number.isInteger(n)) return null;
    if (n < 1 || n > 3) return null;
    return n;
  }, [series]);

  return (
    <View style={quizStyles.container}>
      <Text style={quizStyles.title}>
        {seriesNumber ? `Série ${seriesNumber}` : "Série inconnue"}
      </Text>
    </View>
  );
}

