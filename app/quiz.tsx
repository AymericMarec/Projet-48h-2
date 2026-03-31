import type { ReactNode } from "react";
import { useEffect } from "react";
import { useQuestion } from "./hooks/useQuiz";
import StandardQuestion from "./components/question/StandardQuestion";
import { useQuiz } from "@/app/context/quizContext";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { QuizBackground } from "./components/ui/QuizBackground";
import { quizStyles } from "../assets/style/quiz.styles";
import LivesIndicator from "./components/ui/LivesIndicator";
import LongPressSkippableTitle from "./components/ui/LongPressSkippableTitle";
import Question from "./components/ui/Question";
import { EndComponent } from "./components/ui/EndComponent";
import AppText from "@/app/components/ui/AppText";

export default function QuizPage() {
  const { chapterIndex, questionIndex, lives, reset } = useQuiz();
  const router = useRouter();
  const isLoose = lives <= 0;
  const isWin = questionIndex == 10;
  const hasEnded = isLoose || isWin;

  useEffect(() => {
    if (!hasEnded) return;

    const timeout = setTimeout(() => {
      reset();
      router.replace("/");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [hasEnded, reset, router]);

  const question = useQuestion(String(chapterIndex), questionIndex);
  
  let view: ReactNode = (
    <View>
      <AppText>Init</AppText>
    </View>
  );

  if (!question) {
    view = (
      <View>
        <Text>aucune question trouvé avec chapitre : {chapterIndex} et question numero : {questionIndex}</Text>
      </View>
    );
  } else if (question.type === "basic") {
    view = <StandardQuestion question={question} />;
  } else if (question.type === "interactive") {
    view = <question.component />;
  }

  return (
    <QuizBackground variant={isLoose ? "loose" : isWin ? "win" : undefined}>
      <SafeAreaView style={quizStyles.container}>
        {!isLoose && !isWin && <LivesIndicator />}
        <View style={{ flex: 1, width: "100%", minHeight: 0 }}>
          {!isLoose && !isWin && question?.type === "interactive" && (
            <View style={quizStyles.interactiveTitleSlot}>
              {question.needSkipButton ? (
                <LongPressSkippableTitle title={question.title} />
              ) : (
                <Question title={question.title} variant="shell" />
              )}
            </View>
          )}
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 0,
            }}
          >
            {hasEnded ? <EndComponent isWin={isWin} /> : view}
          </View>
        </View>
      </SafeAreaView>
    </QuizBackground>
  );
}
