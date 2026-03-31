import { Question } from "@/app/types/quiz";
import DoNotPressQuestion from "../components/question/DoNotPressQuestion";
import HiddenCat from "../components/question/HiddenCat";

export const questions: Record<string, Array<Question>> = {
    "1": [ // Série de question numero un
      {
          type:"basic",
          question: "Capitale de la France ?",
          options: ["Paris", "Lyon", "Marseille", "Bordeaux"],
          answer: "Paris",
      },
      {
        type:"basic",
        question: "2 + 2 ?",
        options: ["3", "4", "5", "6"],
        answer: "4",
      },
      {
        type:"interactive",
        component: HiddenCat,
        needSkipButton: false
      }
  ],

};