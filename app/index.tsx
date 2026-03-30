import { Accelerometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Index() {
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
