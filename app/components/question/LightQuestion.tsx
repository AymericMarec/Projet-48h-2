import { LightSensor } from "expo-sensors";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LightQuestion() {
  const [lux, setLux] = useState(1000);
  const [bgColor, setBgColor] = useState("white");
  const [win, setWin] = useState(false);

  const darkStartRef = useRef<number | null>(null);

  const RED_THRESHOLD = 150; // faible luminosité
  const WIN_THRESHOLD = 65; // quasi noir
  const REQUIRED_TIME = 0; // 1 seconde

  useEffect(() => {
    const start = async () => {
      const isAvailable = await LightSensor.isAvailableAsync();

      if (!isAvailable) {
        console.log("LightSensor non disponible");
        return;
      }

      LightSensor.setUpdateInterval(200);

      const subscription = LightSensor.addListener(({ illuminance }) => {
        if (win) return;

        setLux(illuminance);

        if (illuminance <= RED_THRESHOLD) {
          setBgColor("red");
        } else {
          setBgColor("white");
        }
        if (illuminance <= WIN_THRESHOLD) {
          if (!darkStartRef.current) {
            darkStartRef.current = Date.now();
          } else {
            const duration = Date.now() - darkStartRef.current;
            if (duration >= REQUIRED_TIME) {
              setWin(true);
              setBgColor("green");
            }
          }
        } else {
          darkStartRef.current = null;
        }
      });

      return subscription;
    };

    let subscription: { remove: () => void } | undefined;

    start().then((sub) => {
      subscription = sub;
    });

    return () => {
      subscription?.remove();
    };
  }, [win]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: win ? "green" : bgColor }]}
    >
      {win ? (
        <Text style={styles.text}>WIN</Text>
      ) : (
        <>
          <Text style={styles.text}>Mets le téléphone dans le noir</Text>
          <Text style={styles.value}>{lux.toFixed(1)} lux</Text>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  value: {
    marginTop: 16,
    fontSize: 22,
    color: "black",
  },
});
