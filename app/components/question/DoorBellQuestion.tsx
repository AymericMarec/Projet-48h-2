import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import AppText from "@/app/components/ui/AppText";
import { quizStyles } from "@/assets/style/quiz.styles";

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
        <View style={{ flex: 1, width: "100%", position: "relative" }}>
            {isWin && (
              <View style={quizStyles.winMessageSlot} pointerEvents="none">
                <AppText style={quizStyles.winMessageText}>
                  Bravo , bonne réponse
                </AppText>
              </View>
            )}
            <Pressable onLongPress={win}>
                <AppText>.</AppText>
            </Pressable>
        </View>
    )
}