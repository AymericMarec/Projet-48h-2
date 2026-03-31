import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { AppState, Image, StyleSheet, View } from "react-native";

const sleepImage = require("../../../assets/questions/sleep.png");

const REQUIRED_BREAK_MS = 2000;

export default function BreakQuestion() {
  const { nextQuestion } = useQuiz();

  const appStateRef = useRef(AppState.currentState);
  const leftAtRef = useRef<number | null>(null);
  const hasWonRef = useRef(false);

  function handleWin() {
    if (hasWonRef.current) return;

    hasWonRef.current = true;
    nextQuestion();
    router.push("/quiz");
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      const prevState = appStateRef.current;

      if (prevState === "active" && nextState !== "active") {
        leftAtRef.current = Date.now();
      }

      if (nextState === "active" && leftAtRef.current !== null) {
        const timeAway = Date.now() - leftAtRef.current;

        if (timeAway >= REQUIRED_BREAK_MS) {
          handleWin();
        }

        leftAtRef.current = null;
      }

      appStateRef.current = nextState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={sleepImage} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 220,
    height: 220,
  },
});
