import { StyleSheet } from "react-native";

export const quizStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  livesWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  livesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  heartSlot: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  questionWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  questionTitle: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
    marginBottom: 24,
    marginTop: 24,
    paddingHorizontal: 8,
    width: "100%",
    transform: [{ translateY: 60 }],
  },
  /** Titre des questions interactives (zone quiz, sans translateY pour éviter les chevauchements). */
  questionTitleInteractive: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
    marginBottom: 24,
    marginTop: 24,
    paddingHorizontal: 8,
    width: "100%",
  },
  interactiveTitleSlot: {
    width: "100%",
    flexShrink: 0,
    marginBottom: 4,
    paddingHorizontal: 0,
  },
});

