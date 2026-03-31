import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import React from "react";
import { PanResponder, View } from "react-native";
import AppText from "@/app/components/ui/AppText";
export default function SwipeZone() {
    const { nextQuestion,loseLife } = useQuiz();

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
            loseLife()
            router.push(`/quiz`)
        } else if (gestureState.dx < -50) {
            nextQuestion()
            router.push(`/quiz`)
        }
      },
    })
  ).current;

  return (
    <View
      {...panResponder.panHandlers}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText style={{ fontSize: 80 }}>➡️</AppText>
    </View>
  );
}