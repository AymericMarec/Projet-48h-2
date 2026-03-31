import Answers from "@/app/components/ui/Answers";
import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { LightSensor } from "expo-sensors";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "@/app/components/ui/AppText";
import { quizStyles } from "@/assets/style/quiz.styles";

const image1 = require("../../../assets/questions/light_1.jpg");
const image2 = require("../../../assets/questions/light_2.jpg");

const WIN_THRESHOLD = 65;
const REQUIRED_TIME = 500;

export default function LightQuestion() {
  const { loseLife, nextQuestion } = useQuiz();

  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [clue, setClue] = useState("");
  const darkStartRef = useRef<number | null>(null);
  const hasWonRef = useRef(false);
  const clueTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function displayClue() {
    setClue("Bonne idée !");

    if (clueTimeoutRef.current) {
      clearTimeout(clueTimeoutRef.current);
    }

    clueTimeoutRef.current = setTimeout(() => {
      setClue("");
    }, 3000);
  }

  function onGoodWrongAnswer() {
    if (hasWonRef.current) return;
    loseLife();
    displayClue();
  }

  function onWrongAnswer() {
    if (hasWonRef.current) return;
    loseLife();
  }

  function handleWin() {
    if (hasWonRef.current) return;

    hasWonRef.current = true;

    setIsWin(true);
    setTimeout(() => {
      nextQuestion();
      router.push("/quiz");
    }, 2000);
  }

  useEffect(() => {
    let subscription: { remove: () => void } | undefined;

    const start = async () => {
      const isAvailable = await LightSensor.isAvailableAsync();

      if (!isAvailable) {
        console.log("LightSensor non disponible");
        return;
      }

      LightSensor.setUpdateInterval(200);

      subscription = LightSensor.addListener(({ illuminance }) => {
        if (hasWonRef.current) return;

        if (illuminance <= WIN_THRESHOLD) {
          if (darkStartRef.current === null) {
            darkStartRef.current = Date.now();
          } else {
            const duration = Date.now() - darkStartRef.current;

            if (duration >= REQUIRED_TIME) {
              handleWin();
            }
          }
        } else {
          darkStartRef.current = null;
        }
      });
    };

    start();

    return () => {
      subscription?.remove();

      if (clueTimeoutRef.current) {
        clearTimeout(clueTimeoutRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {isWin && (
        <View style={quizStyles.winMessageSlot} pointerEvents="none">
          <AppText style={[quizStyles.winMessageText, styles.winMessageOnDark]}>
            Bravo , bonne réponse
          </AppText>
        </View>
      )}
      <View style={styles.answersContainer}>
        <Answers
          squared={false}
          options={[
            {
              title: "Décrocher comme la dame",
              onClick: onGoodWrongAnswer,
              img: image1,
            },
            {
              title: "Jeter son téléphone",
              onClick: onWrongAnswer,
              img: image2,
            },
          ]}
        />
      </View>

      {!!clue && <AppText style={styles.clue}>{clue}</AppText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  answersContainer: {
    flex: 1,
    justifyContent: "center",
    minHeight: 0,
    width: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  clue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    transform: [{ translateY: -50 }],
  },
  winMessageOnDark: {
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
