import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import AppButton from "@/app/components/ui/AppButton";
import AppText from "@/app/components/ui/AppText";
import { quizStyles } from "@/assets/style/quiz.styles";

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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
            {isWin && (
              <View style={quizStyles.winMessageSlot} pointerEvents="none">
                <AppText style={quizStyles.winMessageText}>
                  Bravo , bonne réponse
                </AppText>
              </View>
            )}
            <AppButton
                onClick={onClickLoose}
                text={"Clique ici"}
                variant="red"
            />
        </View>
    )
}
