import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Pressable, Button,Text } from "react-native";
import AppButton from "@/app/components/ui/AppButton";

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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {isWin && <Text>Bravo , bonne réponse</Text>}
            <AppButton
                onClick={onClickLoose}
                text={"Clique ici"}
                variant="red"
            />
        </View>
    )
}
