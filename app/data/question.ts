import { Question } from "@/app/types/quiz";

export const questions: Record<string, Question> = {
  "1": {
    question: "Capitale de la France ?",
    options: ["Paris", "Lyon", "Marseille"],
    answer: "Paris",
  },
  "2": {
    question: "2 + 2 ?",
    options: ["3", "4", "5"],
    answer: "4",
  },
};