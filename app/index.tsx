import { Text, View } from "react-native";
import SizeComparison2 from "./components/question/SizeComparison2";
import SizeComparison1 from "./components/question/SizeComparison1";

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
        <SizeComparison1 />
      </Text>
    </View>
  );
}
