import { createContext, useContext, useState } from "react";

type QuizContextType = {
  lives: number;
  chapterIndex: number;
  questionIndex: number;

  loseLife: () => void;
  nextQuestion: () => void;
  chooseChapter: (chapterIndex:number) => void;
  reset: () => void;
  resetLife:() => void;
};

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [lives, setLives] = useState(3);
  const [chapterIndex, setChapterIndex] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);

  function loseLife() {
    setLives((prev) => {
      const nextLives = Math.max(prev - 1, 0);
      return nextLives;
    });
  }

  function resetLife(){
    setLives(3)
  }

  function nextQuestion() {
    setQuestionIndex((prev) => prev + 1);
  }

  function chooseChapter(chapterIndex:number) {
    setChapterIndex(chapterIndex);
    setQuestionIndex(0);
  }

  function reset() {
    setLives(3);
    setChapterIndex(1);
    setQuestionIndex(0);
  }

  return (
    <QuizContext.Provider
      value={{
        lives,
        chapterIndex,
        questionIndex,
        loseLife,
        nextQuestion,
        chooseChapter,
        reset,
        resetLife,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuiz must be used inside QuizProvider");
  }

  return context;
}