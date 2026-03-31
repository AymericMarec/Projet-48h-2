import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { Pressable } from "react-native";
import Question from "./Question";

const HOLD_MS = 6000;

type Props = {
  title: string;
};

export default function LongPressSkippableTitle({ title }: Props) {
  const { nextQuestion } = useQuiz();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHold = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onComplete = useCallback(() => {
    clearHold();
    nextQuestion();
    router.push("/quiz");
  }, [nextQuestion, clearHold]);

  useEffect(() => {
    return () => clearHold();
  }, [clearHold]);

  const onPressIn = () => {
    clearHold();
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      onComplete();
    }, HOLD_MS);
  };

  const onPressOut = () => {
    clearHold();
  };

  return (
    <Pressable
      style={{ width: "100%" }}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Question title={title} variant="shell" />
    </Pressable>
  );
}
