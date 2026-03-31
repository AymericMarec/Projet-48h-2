import Answers from "@/app/components/ui/Answers";
import Question from "@/app/components/ui/Question";
import { useQuiz } from "@/app/context/quizContext";
import { Audio } from "expo-av";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const sound1 = require("../../../assets/questions/sound_1.jpg");
const sound2 = require("../../../assets/questions/sound_2.jpg");
const sound3 = require("../../../assets/questions/sound_3.jpg");
const sound4 = require("../../../assets/questions/sound_4.jpg");

const THRESHOLD = -10; // plus sensible
const REQUIRED_TIME = 1000; // 2 secondes
const TOLERANCE = 600; // tolère les trous (-160)

export default function SoundQuestion() {
  const { loseLife, nextQuestion } = useQuiz();

  const [win, setWin] = useState(false);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastLoudTimeRef = useRef<number | null>(null);
  const hasWonRef = useRef(false);

  function onWrongAnswer() {
    if (hasWonRef.current) return;
    loseLife();
  }

  async function stopRecording() {
    try {
      const recording = recordingRef.current;
      if (!recording) return;

      const status = await recording.getStatusAsync();
      if (status.isRecording) {
        await recording.stopAndUnloadAsync();
      }

      recordingRef.current = null;
    } catch {
      // ignore
    }
  }

  async function handleWin() {
    if (hasWonRef.current) return;

    hasWonRef.current = true;
    setWin(true);

    await stopRecording();
    nextQuestion();
    router.push("/quiz");
  }

  useEffect(() => {
    let isMounted = true;

    const startRecording = async () => {
      try {
        const permission = await Audio.requestPermissionsAsync();
        if (!permission.granted) return;

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const recording = new Audio.Recording();
        recordingRef.current = recording;

        await recording.prepareToRecordAsync({
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
          isMeteringEnabled: true,
        });

        recording.setProgressUpdateInterval(100);

        recording.setOnRecordingStatusUpdate((status) => {
          if (!isMounted || hasWonRef.current || !status.isRecording) return;

          const level = status.metering ?? -160;
          const now = Date.now();

          // 🔊 bruit détecté
          if (level > THRESHOLD) {
            lastLoudTimeRef.current = now;

            if (startTimeRef.current === null) {
              startTimeRef.current = now;
            }

            const duration = now - startTimeRef.current;

            if (duration >= REQUIRED_TIME) {
              handleWin();
            }

            return;
          }

          // 🧠 tolérance aux trous (-160)
          if (
            lastLoudTimeRef.current !== null &&
            now - lastLoudTimeRef.current <= TOLERANCE
          ) {
            return;
          }

          // ❌ reset si vraiment silence prolongé
          startTimeRef.current = null;
          lastLoudTimeRef.current = null;
        });

        await recording.startAsync();
      } catch (error) {
        console.log("Erreur micro :", error);
      }
    };

    startRecording();

    return () => {
      isMounted = false;
      stopRecording();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Question title="Fais fuir l'ours" />

      <View style={styles.answersContainer}>
        <Answers
          squared
          options={[
            { title: "Option 1", onClick: onWrongAnswer, img: sound1 },
            { title: "Option 2", onClick: onWrongAnswer, img: sound2 },
            { title: "Option 3", onClick: onWrongAnswer, img: sound3 },
            { title: "Option 4", onClick: onWrongAnswer, img: sound4 },
          ]}
        />
      </View>

      <Text style={styles.text}>
        Crie dans le téléphone pour faire fuir l'ours
      </Text>

      {win && <Text style={styles.winText}>WIN 🎉</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  answersContainer: {
    flex: 1,
    justifyContent: "center",
    minHeight: 0,
    width: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  winText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
});