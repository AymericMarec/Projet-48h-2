import { LayoutChangeEvent, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { indexStyles } from "../assets/style/home.styles";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const [seriesButtonsTop, setSeriesButtonsTop] = useState<number | null>(null);
  const [titleHeight, setTitleHeight] = useState<number | null>(null);

  const titleTop = useMemo(() => {
    if (seriesButtonsTop === null || titleHeight === null) return 0;
    return seriesButtonsTop / 2 - titleHeight / 2;
  }, [seriesButtonsTop, titleHeight]);

  return (
    <SafeAreaView style={indexStyles.container}>
      <View
        style={indexStyles.titlePlaceholder}
        pointerEvents="none"
        onLayout={(e: LayoutChangeEvent) => {
          setTitleHeight(e.nativeEvent.layout.height);
        }}
      >
        <Text style={[indexStyles.title, { opacity: 0 }]}>Quizz</Text>
      </View>

      <View
        style={[indexStyles.titleWrapper, { top: titleTop }]}
        pointerEvents="none"
      >
        <Text style={[indexStyles.title, { marginBottom: 0 }]}>Quizz</Text>
      </View>

      <View
        style={indexStyles.seriesButtons}
        onLayout={(e: LayoutChangeEvent) => {
          setSeriesButtonsTop(e.nativeEvent.layout.y);
        }}
      >
        {[1, 2, 3].map((n) => (
          <Pressable
            key={n}
            accessibilityRole="button"
            style={[
              indexStyles.seriesButton,
              n !== 3 ? { marginBottom: 18 } : null,
            ]}
            onPress={() => {
              router.push(`/quiz?series=${n}`);
            }}
          >
            <Text style={indexStyles.seriesButtonText}>Série {n}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        style={indexStyles.settingsButton}
        onPress={() => {
          // No-op pour l'instant : le comportement du bouton Settings sera ajouté plus tard.
        }}
      >
        <Text style={indexStyles.settingsButtonText}>Settings</Text>
      </Pressable>
    </SafeAreaView>
  );
}
