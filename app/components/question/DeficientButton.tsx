import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Pressable, View,Text } from "react-native";
import AppButton from "@/app/components/ui/AppButton";

export default function DeficientButton(){
    const { nextQuestion,loseLife } = useQuiz();
    const [isWin, setIsWin] = useState<boolean | null>(null);
    
    let pushCount = 0

    function loose(){
        loseLife()
    }
    async function push(){
        pushCount+=1
        if(pushCount >= 10){
        setIsWin(true);
            await new Promise((r) => setTimeout(r, 2000));
        
            nextQuestion();
            router.push("/quiz");
        }
    }

    return (
        <View style={{ gap: 40 }}>
            {isWin && <Text>Bravo , bonne réponse</Text>} 
            <AppButton
                onClick={loose}
                text={"Clique ici"}
                variant="red"
            />
            <AppButton
                onClick={loose}
                text={"Clique ici"}
                variant="blue"
            />
            <AppButton
                onClick={push}
                text={"Clique ici"}
                variant="yellow"
            />
        </View>
    )
}