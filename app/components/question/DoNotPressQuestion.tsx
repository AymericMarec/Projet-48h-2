import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { View,Text, Pressable, Button } from "react-native";

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
            <Text>Cliquez le plus rapidement possible sur aucun bouton</Text>
            <Pressable>
                <Button title="Clique ici" onPress={onClickLoose}/>
            </Pressable>
        </View>
    )
}
