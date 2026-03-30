import { ReactNode } from "react";
import { View } from "react-native";
import { quizBackgroundStyles as styles } from "../../assets/style/quizBackground.styles";

type QuizBackgroundProps = {
  children: ReactNode;
};

export function QuizBackground({ children }: QuizBackgroundProps) {
  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={styles.decorLayer}>
        <View style={[styles.shape, styles.triangleTopLeft]} />
        <View style={[styles.shape, styles.squareTopRight]} />
        <View style={[styles.shape, styles.circleCenter]} />
        <View style={[styles.shape, styles.circleBottomLeft]} />
        <View style={[styles.shape, styles.squareBottomRight]} />
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}
