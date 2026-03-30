import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const SHADOW = {
  shadowColor: "#585858",
  shadowOpacity: 0.22,
  shadowRadius: 1,
  shadowOffset: { width: 10, height: 8 },
  elevation: 6,
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
  shape: {
    position: "absolute",
    ...SHADOW,
  },
  triangleTopLeft: {
    top: height * 0.09,
    left: -width * 0.08,
    width: width * 0.16,
    height: width * 0.12,
    borderRadius: width * 0.04,
    backgroundColor: "#BFD4CF",
    transform: [{ rotate: "18deg" }],
  },
  squareTopRight: {
    top: height * 0.075,
    right: -width * 0.06,
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.03,
    backgroundColor: "#C8D9B0",
    transform: [{ rotate: "-23deg" }],
  },
  circleCenter: {
    top: height * 0.36,
    left: width * 0.56,
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    backgroundColor: "#DABFC0",
  },
  circleBottomLeft: {
    bottom: height * 0.18,
    left: -width * 0.12,
    width: width * 0.36,
    height: width * 0.36,
    borderRadius: width * 0.18,
    backgroundColor: "#E9DEB2",
  },
  squareBottomRight: {
    bottom: height * 0.06,
    right: -width * 0.06,
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.035,
    backgroundColor: "#C4D6AE",
    transform: [{ rotate: "-24deg" }],
  },
});
