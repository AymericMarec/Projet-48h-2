import Answers from "@/app/components/ui/Answers";
import Question from "@/app/components/ui/Question";
import { useQuiz } from "@/app/context/quizContext";
import { BasicQuestion } from "@/app/types/quiz";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import AppText from "@/app/components/ui/AppText";

type Props = {
  question: BasicQuestion;
};

export default function StandardQuestion({ question }: Props) {
  const { nextQuestion, loseLife } = useQuiz();
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);

  function CheckAnswer(answer: string) {
    if (answer !== question.answer) {
      setIsCorrectAnswer(false);
      loseLife();
      return;
    }

    setIsCorrectAnswer(true);
    // RAJOUTER ANIMATION
    nextQuestion();
    router.push(`/quiz`);
  }

  return (
    <View style={{ width: "100%", flex: 1, alignItems: "stretch" }}>
      <Question title={question.question} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          minHeight: 0,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Answers
          squared={question.squared}
          options={question.options.map((opt) => ({
            title: opt,
            onClick: () => CheckAnswer(opt),
          }))}
        />
      </View>
      {isCorrectAnswer !== null && (
        <View style={{ marginTop: 16, alignItems: "center" }}>
          {isCorrectAnswer ? (
            <AppText>Bonne réponse</AppText>
          ) : (
            <AppText>Mauvaise réponse</AppText>
          )}
        </View>
      )}
    </View>
  );
}
