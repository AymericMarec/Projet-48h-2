import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { Image } from "expo-image";
import { useQuiz } from "@/app/context/quizContext";
import { quizStyles } from "@/assets/style/quiz.styles";

const TOTAL_LIVES = 3;
const HEART_SIZE = 35;
const FULL_HEART_SOURCE = require("../../../assets/questions/heart-bold.png");
const BROKEN_HEART_SOURCE = require("../../../assets/questions/heart-broken-bold.png");

type HeartState = "full" | "broken" | "empty";

function createDefaultStates(): HeartState[] {
  return Array.from({ length: TOTAL_LIVES }, () => "full");
}

export default function LivesIndicator() {
  const { lives } = useQuiz();
  const previousLivesRef = useRef(lives);
  const [heartStates, setHeartStates] = useState<HeartState[]>(() =>
    createDefaultStates()
  );

  const opacityValues = useMemo(
    () =>
      Array.from({ length: TOTAL_LIVES }, (_, index) =>
        new Animated.Value(index < lives ? 1 : 0)
      ),
    []
  );

  useEffect(() => {
    setHeartStates((current) =>
      current.map((_, index) => (index < lives ? "full" : "empty"))
    );
    opacityValues.forEach((value, index) => {
      value.setValue(index < lives ? 1 : 0);
    });
    previousLivesRef.current = lives;
  }, []);

  useEffect(() => {
    const previousLives = previousLivesRef.current;

    if (lives === previousLives) {
      return;
    }

    if (lives > previousLives) {
      setHeartStates((current) =>
        current.map((_, index) => (index < lives ? "full" : "empty"))
      );
      opacityValues.forEach((value, index) => {
        value.setValue(index < lives ? 1 : 0);
      });
      previousLivesRef.current = lives;
      return;
    }

    const lostLifeIndexes = Array.from(
      { length: previousLives - lives },
      (_, offset) => previousLives - 1 - offset
    );

    lostLifeIndexes.forEach((heartIndex, offset) => {
      const animatedOpacity = opacityValues[heartIndex];

      setTimeout(() => {
        setHeartStates((current) => {
          const next = [...current];
          next[heartIndex] = "broken";
          return next;
        });

        animatedOpacity.setValue(1);
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 380,
          delay: 260,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (!finished) return;
          setHeartStates((current) => {
            const next = [...current];
            next[heartIndex] = "empty";
            return next;
          });
        });
      }, offset * 120);
    });

    previousLivesRef.current = lives;
  }, [lives, opacityValues]);

  return (
    <View style={quizStyles.livesWrapper}>
      <View style={quizStyles.livesRow}>
        {heartStates.map((state, index) => {
          if (state === "empty") {
            return <View key={index} style={quizStyles.heartSlot} />;
          }

          const heartSource =
            state === "broken" ? BROKEN_HEART_SOURCE : FULL_HEART_SOURCE;

          return (
            <Animated.View
              key={index}
              style={[quizStyles.heartSlot, { opacity: opacityValues[index] }]}
            >
              <Image
                source={heartSource}
                style={{ width: HEART_SIZE, height: HEART_SIZE }}
                contentFit="contain"
              />
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}
