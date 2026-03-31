import { useEffect, useRef } from "react";
import { View, Image, Animated } from "react-native";
import { endStyles as styles } from "../../assets/style/end.styles";

type EndComponentProps = {
  isWin?: boolean;
};

export function EndComponent({ isWin = false }: EndComponentProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={
            isWin
              ? require("../../assets/questions/WIN.png")
              : require("../../assets/questions/LOOSE.png")
          }
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}