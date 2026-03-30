import { questions } from '@/app/data/question';
import { Question } from '@/app/types/quiz';

export function useQuestion(id: number):Question {
  return questions[id]
}