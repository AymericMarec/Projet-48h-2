import { quizStyles } from "@/assets/style/quiz.styles";
import AppText from "@/app/components/ui/AppText";

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
  return <AppText style={style}>{title}</AppText>;
}
