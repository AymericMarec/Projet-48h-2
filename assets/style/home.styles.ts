import { StyleSheet } from "react-native";

export const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 34,
  },
  titlePlaceholder: {
    alignItems: "center",
    width: "100%",
  },
  titleWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  settingsButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    marginTop: 26,
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  seriesButtons: {
    alignItems: "center",
    width: "65%",
  },
  seriesButton: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
  },
  seriesButtonText: {
    fontSize: 18,
    fontWeight: "700",
  },
});

