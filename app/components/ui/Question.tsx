import { quizStyles } from "@/assets/style/quiz.styles";
import { Text } from "react-native";

type QuestionProps = {
  title: string;
};

export default function Question({ title }: QuestionProps) {
  return <Text style={quizStyles.questionTitle}>{title}</Text>;
}
