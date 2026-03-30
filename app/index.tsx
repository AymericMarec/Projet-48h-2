import { Text, View } from "react-native";
import StandardQuestion from "./components/question/StandardQuestion";
import DoNotPressQuestion from "./components/question/DoNotPressQuestion";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <DoNotPressQuestion/>
    </View>
  );
}
