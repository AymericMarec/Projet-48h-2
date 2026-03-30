import { ReactNode } from "react";
import { View } from "react-native";
import { quizBackgroundStyles as styles } from "../../../assets/style/quizBackground.styles";

type QuizBackgroundProps = {
  children: ReactNode;
};

export function QuizBackground({ children }: QuizBackgroundProps) {
  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={styles.decorLayer}>
        <View style={[styles.shapeOuter, styles.triangleTopLeftOuter]}>
          <View style={[styles.shapeInner, styles.triangleTopLeftInner]} />
        </View>
        <View style={[styles.shapeOuter, styles.squareTopRightOuter]}>
          <View style={[styles.shapeInner, styles.squareTopRightInner]} />
        </View>
        <View style={[styles.shapeOuter, styles.circleCenterOuter]}>
          <View style={[styles.shapeInner, styles.circleCenterInner]} />
        </View>
        <View style={[styles.shapeOuter, styles.circleBottomLeftOuter]}>
          <View style={[styles.shapeInner, styles.circleBottomLeftInner]} />
        </View>
        <View style={[styles.shapeOuter, styles.squareBottomRightOuter]}>
          <View style={[styles.shapeInner, styles.squareBottomRightInner]} />
        </View>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}
