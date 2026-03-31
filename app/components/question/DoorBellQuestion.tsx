import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Pressable, View, Text } from "react-native";

export default function DoorBellQuestion(){
    const [isWin, setIsWin] = useState<boolean | null>(null);
    const { nextQuestion } = useQuiz();
    async function win(){
        setIsWin(true);
        await new Promise((r) => setTimeout(r, 2000));
    
        nextQuestion();
        router.push("/quiz");
    }
    

    return (
        <View>
            <Text>Il y a quelqu’un ?</Text>
            <Pressable onLongPress={win}>
                <Text>.</Text>
            </Pressable>
        </View>
    )
}