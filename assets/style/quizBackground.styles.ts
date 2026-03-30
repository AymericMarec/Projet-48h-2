import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const OUTLINE_WIDTH = 4;

const HARD_SHADOW = {
  shadowColor: "#4B4B4B",
  shadowOpacity: 0.34,
  shadowRadius: 0.6,
  shadowOffset: { width: 9, height: 7 },
  elevation: 12,
} as const;

export const quizBackgroundStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F4F0E2",
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
    padding: OUTLINE_WIDTH,
    backgroundColor: "#B6B1A4",
    ...HARD_SHADOW,
  },
  shapeInner: {
    flex: 1,
  },
  triangleTopLeftOuter: {
    top: height * 0.09,
    left: -width * 0.08,
    width: width * 0.16,
    height: width * 0.12,
    borderRadius: width * 0.04,
    transform: [{ rotate: "18deg" }],
  },
  triangleTopLeftInner: {
    borderRadius: width * 0.04 - OUTLINE_WIDTH,
    backgroundColor: "#BFD4CF",
  },
  squareTopRightOuter: {
    top: height * 0.075,
    right: -width * 0.06,
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.03,
    transform: [{ rotate: "-23deg" }],
  },
  squareTopRightInner: {
    borderRadius: width * 0.03 - OUTLINE_WIDTH,
    backgroundColor: "#C8D9B0",
  },
  circleCenterOuter: {
    top: height * 0.36,
    left: width * 0.56,
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
  },
  circleCenterInner: {
    borderRadius: width * 0.1 - OUTLINE_WIDTH,
    backgroundColor: "#DABFC0",
  },
  circleBottomLeftOuter: {
    bottom: height * 0.18,
    left: -width * 0.12,
    width: width * 0.36,
    height: width * 0.36,
    borderRadius: width * 0.18,
  },
  circleBottomLeftInner: {
    borderRadius: width * 0.18 - OUTLINE_WIDTH,
    backgroundColor: "#E9DEB2",
  },
  squareBottomRightOuter: {
    bottom: height * 0.06,
    right: -width * 0.06,
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.035,
    transform: [{ rotate: "-24deg" }],
  },
  squareBottomRightInner: {
    borderRadius: width * 0.035 - OUTLINE_WIDTH,
    backgroundColor: "#C4D6AE",
  },
});
