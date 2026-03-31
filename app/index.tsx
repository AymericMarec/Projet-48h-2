import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { indexStyles } from "../assets/style/home.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuiz } from "@/app/context/quizContext"
import { Image } from "expo-image";

import { QuizBackground } from "./components/ui/QuizBackground";
import AppButton from "./components/ui/AppButton";

export default function Index() {
  const { chooseChapter } = useQuiz();

  return (
    <QuizBackground>
      <SafeAreaView style={indexStyles.container}>
        <View style={indexStyles.titleWrapper} pointerEvents="none">
          <Image
            source={require("../assets/questions/Title.png")}
            style={indexStyles.titleImage}
            contentFit="contain"
          />
        </View>

        <View style={indexStyles.seriesButtons}>
          <AppButton
            onClick={() => {
              chooseChapter(1);
              router.push(`/quiz`);
            }}
            text="Chapitre 1"
            variant="red"
          />
          <AppButton
            onClick={() => {
              chooseChapter(2);
              router.push(`/quiz`);
            }}
            text="Chapitre 2"
            variant="blue"
          />
          <AppButton
            onClick={() => {
              chooseChapter(3);
              router.push(`/quiz`);
            }}
            text="Chapitre 3"
            variant="yellow"
          />
          <Pressable
            accessibilityRole="button"
            style={indexStyles.settingsButton}
            onPress={() => {
              // No-op pour l'instant : le comportement du bouton Settings sera ajouté plus tard.
            }}
          >   
            <Image
              source={require("../assets/questions/settings.png")}
              style={indexStyles.settingsImage}
              contentFit="contain"
            />
          </Pressable>
        </View>

        
       
      </SafeAreaView>
    </QuizBackground>
  );
}
