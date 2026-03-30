import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function StressEffect() {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800, // lent = stress propre
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity,
        pointerEvents: "none",
      }}
    >
      <LinearGradient
        colors={[
          "rgba(255,0,0,0.8)", // bord rouge fort
          "transparent",       // centre transparent
        ]}
        style={{
          flex: 1,
        }}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      />
    </Animated.View>
  );
}