import type { ImageSourcePropType } from "react-native";

export type Option = {
  title: string;
  img?: ImageSourcePropType;
  onClick: () => void;
};
