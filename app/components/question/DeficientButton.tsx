import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { Button, Pressable, View } from "react-native";

export default function DeficientButton(){
    const { nextQuestion,loseLife } = useQuiz();
    let pushCount = 0

    function loose(){
        loseLife()
    }
    function push(){
        pushCount+=1
        if(pushCount >= 10){
            nextQuestion()
            router.push(`/quiz`)
        }
    }

    return (
        <View>
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