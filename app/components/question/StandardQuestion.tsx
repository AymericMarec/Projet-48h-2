import { useQuestion } from "@/app/hooks/useQuiz";
import { Question } from "@/app/types/quiz";
import { useState } from "react";
import { Pressable,Text,View } from "react-native";

type Props = {
  idQuestion: number;
};

export default function StandardQuestion({ idQuestion }:Props){
    const question:Question = useQuestion(idQuestion)
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);

    function CheckAnswer(answer:string){
        if(answer != question.answer){
            setIsCorrectAnswer(false)
            // gérer la réponse fausse
            return false
        }
        
        setIsCorrectAnswer(true)
    }
    
    if (!question) {
        return (
        <View>
            <Text>Question introuvable</Text>
        </View>
        );
    }

    return (
        <View>
            <Text>{question.question}</Text>
            <View>
                {question.options.map((option) => (
                    <Pressable key={option} onPress={() => CheckAnswer(option)}>
                        <Text>{option}</Text>
                    </Pressable>
                ))}
            </View>
            <View>
                {isCorrectAnswer !== null && (
                isCorrectAnswer ? (
                    <Text>Bonne réponse</Text>
                ) : (
                    <Text>Mauvaise réponse</Text>
                )
                )}
            </View>
        </View>
    )
}