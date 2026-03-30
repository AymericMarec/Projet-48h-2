import { useLocalSearchParams } from "expo-router";
import { useQuestion } from "./hooks/useQuiz";
import StandardQuestion from "./components/question/StandardQuestion";
import { useQuiz } from "@/app/context/quizContext";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { QuizBackground } from "./components/ui/QuizBackground";
import { quizStyles } from "../assets/style/quiz.styles";

export default function QuizPage() {
  const { chapterIndex, questionIndex } = useQuiz();

  const question = useQuestion(String(chapterIndex), questionIndex);
  let view = (
    <View>
      <Text>Init</Text>
    </View>
  );

  if (!question) {
    view = (
      <View>
        <Text>aucune question trouvé</Text>
      </View>
    );
  }

  if (question.type === "basic") {
    view = <StandardQuestion question={question} />;
  }

  if (question.type === "interactive") {
    view = <question.component />;
  }
  return (
    <QuizBackground>
      <SafeAreaView style={quizStyles.container}>{view}</SafeAreaView>
    </QuizBackground>
  );
}
