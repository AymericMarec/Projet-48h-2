import { useQuiz } from "@/app/context/quizContext";
import { router } from "expo-router";
import { Accelerometer } from "expo-sensors";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const spiderImg = require("../../../assets/questions/spider.png");

const { width, height } = Dimensions.get("window");

const SPIDERS_COUNT = 30;
const SHAKE_THRESHOLD = 3;
const SHAKE_REQUIRED_COUNT = 3;

type SpiderData = {
  id: number;
  top: number;
  left: number;
  size: number;
  rotate: string;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function ShakeQuestion() {
  const { loseLife, nextQuestion } = useQuiz();
  const [isWin, setIsWin] = useState<boolean | null>(null);

  const [won, setWon] = useState(false);

  const shakeCountRef = useRef(0);
  const cooldownRef = useRef(0);
  const hasWonRef = useRef(false);

  const spiders = useMemo<SpiderData[]>(
    () =>
      Array.from({ length: SPIDERS_COUNT }, (_, i) => {
        const size = randomBetween(50, 130); // un peu plus gros

        return {
          id: i,
          size,
          top: randomBetween(0, 500),
          left: randomBetween(-200, 100),
          rotate: `${randomBetween(-50, 50)}deg`,
        };
      }),
    [],
  );

  const shakeAnimRefs = useRef(
    spiders.map(() => new Animated.Value(0)),
  ).current;

  const flyAnimRefs = useRef(
    spiders.map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      opacity: new Animated.Value(1),
      scale: new Animated.Value(1),
    })),
  ).current;

  function handleSpiderPress(index: number) {
    if (hasWonRef.current) return;

    loseLife();

    const anim = shakeAnimRefs[index];
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: -1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }

  async function handleWin() {
    if (hasWonRef.current) return;

    hasWonRef.current = true;
    setWon(true);

    const animations = flyAnimRefs.map((anim, index) => {
      const directionX = index % 2 === 0 ? -1 : 1;
      const directionY = -1;

      return Animated.parallel([
        Animated.timing(anim.x, {
          toValue: directionX * randomBetween(120, 260),
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(anim.y, {
          toValue: directionY * randomBetween(180, 360),
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(anim.scale, {
          toValue: 0.6,
          duration: 500,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.parallel(animations).start(() => {
      setIsWin(true);
      setTimeout(() => {
        nextQuestion();
        router.push("/quiz");
      }, 2000);
    });
  }

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      if (hasWonRef.current) return;

      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();

      if (magnitude > SHAKE_THRESHOLD && now - cooldownRef.current > 400) {
        cooldownRef.current = now;
        shakeCountRef.current += 1;

        if (shakeCountRef.current >= SHAKE_REQUIRED_COUNT) {
          handleWin();
        }
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      {spiders.map((spider, index) => {
        const shakeRotate = shakeAnimRefs[index].interpolate({
          inputRange: [-1, 0, 1],
          outputRange: ["-10deg", "0deg", "10deg"],
        });

        return (
          <Animated.View
            key={spider.id}
            style={[
              styles.spiderWrapper,
              {
                top: spider.top,
                left: spider.left,
                transform: [
                  { translateX: flyAnimRefs[index].x },
                  { translateY: flyAnimRefs[index].y },
                  { scale: flyAnimRefs[index].scale },
                  { rotate: spider.rotate },
                  { rotate: shakeRotate },
                ],
                opacity: flyAnimRefs[index].opacity,
              },
            ]}
          >
            <Pressable
              onPress={() => handleSpiderPress(index)}
              disabled={won}
              style={styles.pressable}
            >
              <Image
                source={spiderImg}
                style={{
                  width: spider.size,
                  height: spider.size,
                }}
                resizeMode="contain"
              />
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  spiderWrapper: {
    position: "absolute",
  },
  pressable: {
    justifyContent: "center",
    alignItems: "center",
  },
});
