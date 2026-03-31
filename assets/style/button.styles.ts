import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /** Bordure et coins communs ; sans taille fixe (réponses quiz, etc.) */
  baseCore: {
    borderRadius: 8,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  base: {
    height: 60,
    width: 258,
    borderRadius: 8,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  red: {
    backgroundColor: "#e0315b",
    borderColor: "#6a0d2f",
    boxShadow: "5px 5px 0px #6a0d2f",
  },

  blue: {
    backgroundColor: "#12ABBF",
    borderColor: "#165951",
    boxShadow: "5px 5px 0px #165951",
  },

  yellow: {
    backgroundColor: "#F1B938",
    borderColor: "#594A16",
    boxShadow: "5px 5px 0px #594A16",
  },

  green: {
    backgroundColor: "#78A752",
    borderColor: "#2D4A22",
    boxShadow: "5px 5px 0px #2D4A22",
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  redText: {
    color: "#3D0F22",
  },
  blueText: {
    color: "#102940",
  },
  yellowText: {
    color: "#403510",
  },
  greenText: {
    color: "#1E3518",
  },
});
