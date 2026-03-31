import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Pressable, View } from "react-native";
import AppText from "@/app/components/ui/AppText";

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
            {isWin && <Text>Bravo , bonne réponse</Text>}
            <Pressable onLongPress={win}>
                <AppText>.</AppText>
            </Pressable>
        </View>
    )
}