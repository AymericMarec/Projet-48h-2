import { quizStyles } from "@/assets/style/quiz.styles";
import { Text } from "react-native";

type QuestionProps = {
  title: string;
  variant?: "standard" | "shell";
};

export default function Question({
  title,
  variant = "standard",
}: QuestionProps) {
  const style =
    variant === "shell"
      ? quizStyles.questionTitleInteractive
      : quizStyles.questionTitle;
  return <Text style={style}>{title}</Text>;
}
