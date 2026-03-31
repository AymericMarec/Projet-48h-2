import AppButton, { type AppButtonVariant } from "@/app/components/ui/AppButton";
import type { Option } from "@/app/types/quizUi";
import { answersStyles } from "@/assets/style/answers.styles";
import { View } from "react-native";

export type { Option } from "@/app/types/quizUi";

/** Ordre maquette liste : rose, bleu, jaune, vert */
const LIST_VARIANTS: AppButtonVariant[] = ["red", "blue", "yellow", "green"];
/** Ordre maquette grille 2×2 : TL, TR, BL, BR */
const SQUARED_VARIANTS: AppButtonVariant[] = ["red", "green", "yellow", "blue"];

type AnswersProps = {
  options: Option[];
  squared?: boolean;
};

export default function Answers({ options, squared = false }: AnswersProps) {
  const variants = squared ? SQUARED_VARIANTS : LIST_VARIANTS;

  return (
    <View
      style={
        squared ? answersStyles.gridContainer : answersStyles.columnContainer
      }
    >
      {options.map((option, index) => (
        <AppButton
          key={`${option.title}-${index}`}
          onClick={option.onClick}
          text={option.title}
          variant={variants[index % variants.length]}
          img={option.img}
          imageAbove={squared}
          fluid
          style={
            squared
              ? answersStyles.answerButtonSquared
              : answersStyles.answerButtonList
          }
        />
      ))}
    </View>
  );
}
