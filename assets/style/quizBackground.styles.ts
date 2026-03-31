import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const OUTLINE_WIDTH = 6;

const HARD_SHADOW = {
  shadowColor: "#000000",
  shadowOpacity: 1,
  shadowRadius: 0,
  shadowOffset: { width: 9, height: 7 },
  elevation: 12,
} as const;

export const quizBackgroundStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFF9E4",
  },
  decorLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  shapeOuter: {
    position: "absolute",
    padding: 0,
    backgroundColor: "transparent",
    ...HARD_SHADOW,
  },
  shapeInner: {
    flex: 1,
  },
  triangleTopLeftOuter: {
    top: height * 0.15,
    left: -width * 0.04,
    width: width * 0.22,
    height: width * 0.18,
    borderRadius: 0,
    opacity: 0.25,
  },
  squareTopRightOuter: {
    top: height * 0.08,
    right: -width * 0.03,
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.03,
    opacity: 0.25,
  },
  squareTopRightInner: {
    borderRadius: width * 0.03 - OUTLINE_WIDTH,
    backgroundColor: "#4BAB41",
  },
  circleCenterOuter: {
    top: height * 0.33,
    left: width * 0.56,
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.1,
    opacity: 0.25,
  },
  circleCenterInner: {
    borderRadius: width * 0.1 - OUTLINE_WIDTH,
    backgroundColor: "#DE3162",
  },
  circleBottomLeftOuter: {
    bottom: height * 0.16,
    left: -width * 0.08,
    width: width * 0.45,
    height: width * 0.45,
    borderRadius: width * 0.18,
    opacity: 0.25,
  },
  circleBottomLeftInner: {
    borderRadius: width * 0.18 - OUTLINE_WIDTH,
    backgroundColor: "#F1B938",
  },
  squareBottomRightOuter: {
    bottom: height * 0.03,
    right: -width * 0.01,
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.035,
    opacity: 0.25,
  },
  squareBottomRightInner: {
    borderRadius: width * 0.035 - OUTLINE_WIDTH,
    backgroundColor: "#4BAB41",
  },
});
