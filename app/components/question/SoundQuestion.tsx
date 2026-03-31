import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SoundQuestion() {
  const [bgColor, setBgColor] = useState("white");
  const [win, setWin] = useState(false);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const THRESHOLD = -25; // sensibilité
  const REQUIRED_TIME = 2000; // 2 secondes

  useEffect(() => {
    let isMounted = true;

    const startRecording = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      recordingRef.current = recording;

      await recording.prepareToRecordAsync({
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        android: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
          isMeteringEnabled: true,
        },
        ios: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
          isMeteringEnabled: true,
        },
      });

      recording.setProgressUpdateInterval(100);

      recording.setOnRecordingStatusUpdate((status) => {
        if (!isMounted || !status.isRecording || win) return;

        const level = status.metering ?? -160;

        if (level > THRESHOLD) {
          setBgColor("red");

          if (!startTimeRef.current) {
            startTimeRef.current = Date.now();
          } else {
            const duration = Date.now() - startTimeRef.current;

            if (duration >= REQUIRED_TIME) {
              setWin(true);
              setBgColor("green");
            }
          }
        } else {
          setBgColor("white");
          startTimeRef.current = null; // reset si le son coupe
        }
      });

      await recording.startAsync();
    };

    startRecording();

    return () => {
      isMounted = false;
      recordingRef.current?.stopAndUnloadAsync();
    };
  }, [win]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      {win && <Text style={styles.text}>WIN 🎉</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
});
