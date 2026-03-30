import { useQuiz } from "@/app/context/quizContext";
import { BasicQuestion, Question } from "@/app/types/quiz";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable,Text,View } from "react-native";

type Props = {
  question: BasicQuestion;
};

export default function StandardQuestion({ question }:Props){
    const { nextQuestion,loseLife } = useQuiz();
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);

    function CheckAnswer(answer:string){
        if(answer != question.answer){
            setIsCorrectAnswer(false)
            loseLife()
        }
        
        setIsCorrectAnswer(true)
        // RAJOUTER ANIMATION
        nextQuestion()
        router.push(`/quiz`)
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