import { Text, View } from "react-native";
import SizeComparison from "./components/question/SizeComparison";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        <SizeComparison />
      </Text>
    </View>
  );
}
