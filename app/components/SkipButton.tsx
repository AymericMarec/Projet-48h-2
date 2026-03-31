import { Pressable, Text } from "react-native";
import { useQuiz } from "../context/quizContext";

export default function SkipButton(){
    const { nextQuestion } = useQuiz();

    return (
        <Pressable onPress={nextQuestion}>
            <Text>Skip</Text>
        </Pressable>
    )

}