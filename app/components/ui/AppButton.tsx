import { styles } from "@/assets/style/button.styles";
import React from "react";
import { Pressable, Text } from "react-native";

type AppButtonProps = {
  onClick: () => void;
  text: string;
  variant?: "red" | "blue" | "yellow";
};

export default function AppButton({
  onClick,
  text,
  variant = "red",
}: AppButtonProps) {
  const isRed = variant === "red";
  const isBlue = variant === "blue";
  const isYellow = variant === "yellow";
  return (
    <Pressable
      onPress={onClick}
      style={[
        styles.base,
        isRed && styles.red,
        isBlue && styles.blue,
        isYellow && styles.yellow,
      ]}
    >
      <Text
        style={[
          styles.text,
          isRed && styles.redText,
          isBlue && styles.blueText,
          isYellow && styles.yellowText,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}
