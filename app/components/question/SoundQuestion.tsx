import Answers from "@/app/components/ui/Answers";
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

  const [isWin, setIsWin] = useState<boolean | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastLoudTimeRef = useRef<number | null>(null);
  const clueTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasWonRef = useRef(false);
  const [clue, setClue] = useState("");

  function onWrongAnswer() {
    if (hasWonRef.current) return;
    loseLife();
  }

  function displayClue() {
    setClue("Bonne idée !");

    if (clueTimeoutRef.current) {
      clearTimeout(clueTimeoutRef.current);
    }

    clueTimeoutRef.current = setTimeout(() => {
      setClue("");
    }, 3000);
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

  function onGoodWrongAnswer() {
    if (hasWonRef.current) return;
    loseLife();
    displayClue();
  }

  async function handleWin() {
    if (hasWonRef.current) return;

    hasWonRef.current = true;
    await stopRecording();

    setIsWin(true);
    await new Promise((r) => setTimeout(r, 2000));

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

          if (
            lastLoudTimeRef.current !== null &&
            now - lastLoudTimeRef.current <= TOLERANCE
          ) {
            return;
          }

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
      {isWin && <Text>Bravo , bonne réponse</Text>}
      <View style={styles.answersContainer}>
        <Answers
          squared
          options={[
            { title: "Nerf", onClick: onWrongAnswer, img: sound1 },
            { title: "Miel", onClick: onWrongAnswer, img: sound2 },
            { title: "Crier fort", onClick: onGoodWrongAnswer, img: sound3 },
            { title: "Tronçonneuse", onClick: onWrongAnswer, img: sound4 },
          ]}
        />
      </View>
      {!!clue && <Text style={styles.clue}>{clue}</Text>}
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
  clue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    transform: [{ translateY: -50 }],
  },
});
