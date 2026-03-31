import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Pressable, Button } from "react-native";

export default function DoNotPressQuestion(){
    const { nextQuestion,loseLife } = useQuiz();
    const [isWin, setIsWin] = useState<boolean | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsWin(true);
            setTimeout(() => {
            nextQuestion();
            router.push("/quiz");
            }, 2000);
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
