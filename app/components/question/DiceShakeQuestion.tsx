import { useQuiz } from "@/app/context/quizContext";
import { Accelerometer } from "expo-sensors";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

const diceImages = {
  1: require("../../../assets/questions/dices/dice_1.png"),
  2: require("../../../assets/questions/dices/dice_2.png"),
  3: require("../../../assets/questions/dices/dice_3.png"),
  4: require("../../../assets/questions/dices/dice_4.png"),
  5: require("../../../assets/questions/dices/dice_5.png"),
  6: require("../../../assets/questions/dices/dice_6.png"),
};

const SHAKE_THRESHOLD = 3;
const SHAKE_COOLDOWN = 700;
const MAX_SHAKES_BEFORE_FORCE_WIN = 5;

function randomDiceValue() {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

export default function DiceShakeQuestion() {
  const { nextQuestion } = useQuiz();

  const [leftDice, setLeftDice] = useState<1 | 2 | 3 | 4 | 5 | 6>(2);
  const [rightDice, setRightDice] = useState<1 | 2 | 3 | 4 | 5 | 6>(4);

  const hasWonRef = useRef(false);
  const lastShakeTimeRef = useRef(0);
  const shakeCountRef = useRef(0);

  function handleWin() {
    if (hasWonRef.current) return;

    hasWonRef.current = true;

    setTimeout(() => {
      nextQuestion();
    }, 500);
  }

  function rollDices() {
    if (hasWonRef.current) return;

    shakeCountRef.current += 1;

    let newLeft: 1 | 2 | 3 | 4 | 5 | 6;
    let newRight: 1 | 2 | 3 | 4 | 5 | 6;

    if (shakeCountRef.current >= MAX_SHAKES_BEFORE_FORCE_WIN) {
      newLeft = 6;
      newRight = 6;
    } else {
      newLeft = randomDiceValue();
      newRight = randomDiceValue();
    }

    setLeftDice(newLeft);
    setRightDice(newRight);

    if (newLeft === 6 && newRight === 6) {
      handleWin();
    }
  }

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      if (hasWonRef.current) return;

      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();

      if (
        magnitude > SHAKE_THRESHOLD &&
        now - lastShakeTimeRef.current > SHAKE_COOLDOWN
      ) {
        lastShakeTimeRef.current = now;
        rollDices();
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={diceImages[leftDice]}
        style={styles.dice}
        resizeMode="contain"
      />
      <Image
        source={diceImages[rightDice]}
        style={styles.dice}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  dice: {
    width: 120,
    height: 120,
  },
});
