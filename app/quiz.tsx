import { useLocalSearchParams } from "expo-router";
import { useQuestion } from "./hooks/useQuiz";
import StandardQuestion from "./components/question/StandardQuestion";
import { useQuiz } from "@/app/context/quizContext";
import { View,Text } from "react-native";

export default function QuizPage() {
  const { chapterIndex,questionIndex } = useQuiz();
  
  const question = useQuestion(String(chapterIndex),questionIndex)

  if (!question){
    return <View><Text>aucune question trouvé</Text></View>
  }

  if (question.type === "basic") {
    return <StandardQuestion question={question} />;
  }

  if (question.type === "interactive") {
    return <question.component/>;
  }
}

