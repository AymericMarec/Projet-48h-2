import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, Pressable, Button } from "react-native";

export default function DoNotPressQuestion(){
    const { nextQuestion,loseLife } = useQuiz();

    useEffect(() => {
        const timer = setTimeout(() => {
            nextQuestion()
            router.push(`/quiz`)
        }, 5000);

    return () => clearTimeout(timer);
  }, []);

    function onClickLoose(){
        loseLife()
    }

    return (
        <View style={{ flex: 1 }}>
            <Pressable>
                <Button title="Clique ici" onPress={onClickLoose}/>
            </Pressable>
        </View>
    )
}
