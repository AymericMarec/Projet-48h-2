import { Accelerometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShakeQuestion() {
  const [bgColor, setBgColor] = useState("white");

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      if (magnitude > 3) {
        setBgColor("red");
      } else {
        setBgColor("white");
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
