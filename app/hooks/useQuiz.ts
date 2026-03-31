import { questions } from '@/app/data/question';
import { Question } from '@/app/types/quiz';

export function useQuestion(
  chapterName: string,
  questionId: number
): Question | undefined {
  return questions[chapterName]?.[questionId];
}