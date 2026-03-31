import { StyleSheet } from "react-native";

export const answersStyles = StyleSheet.create({
  columnContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 14,
    alignItems: "stretch",
  },
  gridContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  listInnerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },
  listThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  squaredImage: {
    width: "70%",
    aspectRatio: 1,
    maxHeight: "55%",
    borderRadius: 8,
    marginBottom: 6,
  },
  answerButtonList: {
    width: "100%",
    minHeight: 56,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  answerButtonSquared: {
    width: "48%",
    aspectRatio: 1,
    padding: 8,
    borderRadius: 12,
  },
});
