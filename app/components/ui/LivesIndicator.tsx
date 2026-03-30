import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuiz } from "@/app/context/quizContext";
import { quizStyles } from "@/assets/style/quiz.styles";

const TOTAL_LIVES = 3;
const HEART_SIZE = 44;
const FULL_HEART_COLOR = "#C5426A";
const BROKEN_HEART_COLOR = "#C5426A";

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

          const iconName = state === "broken" ? "heart-broken" : "heart";
          const color = state === "broken" ? BROKEN_HEART_COLOR : FULL_HEART_COLOR;

          return (
            <Animated.View
              key={index}
              style={[quizStyles.heartSlot, { opacity: opacityValues[index] }]}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={HEART_SIZE}
                color={color}
              />
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}
