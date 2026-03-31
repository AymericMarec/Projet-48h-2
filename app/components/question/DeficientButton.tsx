import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Pressable, View,Text } from "react-native";

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
        <View>
            {isWin && <Text>Bravo , bonne réponse</Text>}
            <Pressable>
                <Button title="Clique ici" onPress={loose}/>
            </Pressable>
            <Pressable>
                <Button title="Clique ici" onPress={loose}/>
            </Pressable>
            <Pressable>
                <Button title="Clique ici" onPress={push}/>
            </Pressable>
        </View>
    )
}