import { StyleSheet } from "react-native";

export const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleWrapper: {
    width: "100%",
    marginTop: 85,
    alignItems: "center",
  },
  titleImage: {
    width: "72%",
    height: 110,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 4,
  },
  titleLetter: {
    fontFamily: "CabinetGrotesk",
    fontSize: 78,
    lineHeight: 86,
    fontWeight: "800",
    color: "#000000",
  },
  seriesButtons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
    marginTop:40,
  },
  settingsButton: {
    marginBottom: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsImage: {
    width: 60,
    height: 60,
  },
});
