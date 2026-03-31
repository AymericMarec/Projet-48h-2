import { styles } from "@/assets/style/button.styles";
import { answersStyles } from "@/assets/style/answers.styles";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View, type StyleProp, type ViewStyle } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { Audio } from "expo-av";

export type AppButtonVariant = "red" | "blue" | "yellow" | "green";

type AppButtonProps = {
  onClick: () => void;
  text: string;
  variant?: AppButtonVariant;
  img?: ImageSourcePropType;
  /** true : image au-dessus du texte (ex. grille carrée) ; false : vignette à gauche (liste) */
  imageAbove?: boolean;
  /** Sans largeur/hauteur fixes (ex. liste pleine largeur ou tuiles carrées) */
  fluid?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function AppButton({
  onClick,
  text,
  variant = "red",
  img,
  imageAbove = false,
  fluid = false,
  style,
}: AppButtonProps) {
  const isRed = variant === "red";
  const isBlue = variant === "blue";
  const isYellow = variant === "yellow";
  const isGreen = variant === "green";

  async function playClick() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sound/buttonClick.mp3")
    );
    await sound.playAsync();
  }

  const pressableStyles = [
    fluid ? styles.baseCore : styles.base,
    isRed && styles.red,
    isBlue && styles.blue,
    isYellow && styles.yellow,
    isGreen && styles.green,
  ];

  const textStyles = [
    styles.text,
    isRed && styles.redText,
    isBlue && styles.blueText,
    isYellow && styles.yellowText,
    isGreen && styles.greenText,
  ];

  const content =
    img && imageAbove ? (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          width: "100%",
        }}
      >
        <Image
          source={img}
          style={answersStyles.squaredImage}
          contentFit="cover"
        />
        <Text style={textStyles} numberOfLines={3}>
          {text}
        </Text>
      </View>
    ) : img ? (
      <View style={answersStyles.listInnerRow}>
        <Image
          source={img}
          style={answersStyles.listThumb}
          contentFit="cover"
        />
        <Text style={[...textStyles, { flex: 1 }]} numberOfLines={2}>
          {text}
        </Text>
      </View>
    ) : (
      <Text style={textStyles}>{text}</Text>
    );

  return (
      <Pressable
        onPress={async () => {
          await playClick();
          onClick();
        }}
        style={[...pressableStyles, style]}
      >
      {content}
    </Pressable>
  );
}
