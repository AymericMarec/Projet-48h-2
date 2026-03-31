import type { TextProps, TextStyle } from "react-native";
import { StyleSheet, Text } from "react-native";

function resolveCabinetFamily(weight: TextStyle["fontWeight"]) {
  if (!weight || weight === "normal") return "CabinetGrotesk-Regular";
  if (weight === "bold") return "CabinetGrotesk-Bold";

  const numericWeight = typeof weight === "string" ? Number(weight) : weight;
  if (!Number.isFinite(numericWeight)) return "CabinetGrotesk-Regular";

  if (numericWeight <= 200) return "CabinetGrotesk-Extralight";
  if (numericWeight <= 300) return "CabinetGrotesk-Light";
  if (numericWeight <= 400) return "CabinetGrotesk-Regular";
  if (numericWeight <= 500) return "CabinetGrotesk-Medium";
  if (numericWeight <= 700) return "CabinetGrotesk-Bold";
  return "CabinetGrotesk-Extrabold";
}

export default function AppText({ style, ...props }: TextProps) {
  const flattenedStyle = StyleSheet.flatten(style) as TextStyle | undefined;
  const fontFamily = resolveCabinetFamily(flattenedStyle?.fontWeight);

  return (
    <Text
      {...props}
      style={[
        style,
        {
          fontFamily,
          fontWeight: undefined,
        },
      ]}
    />
  );
}
