import Answers from "@/app/components/ui/Answers";
import Question from "@/app/components/ui/Question";
import { useQuiz } from "@/app/context/quizContext";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image as ExpoImage } from "expo-image";
import { decode } from "jpeg-js";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { toByteArray } from "base64-js";

export default function FindWhiteQuestion() {
  const { nextQuestion, loseLife } = useQuiz();

  const cameraRef = useRef<CameraView | null>(null);
  const hasWonRef = useRef(false);

  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [message, setMessage] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [capturedUri, setCapturedUri] = useState<string | null>(null);

  function handleWrongAnswer() {
    if (hasWonRef.current) return;
    loseLife();
  }

  function handleWin() {
    if (hasWonRef.current) return;
    hasWonRef.current = true;
    setMessage("Trouvé !");
    setTimeout(() => {
      nextQuestion();
      router.push("/quiz");
    }, 400);
  }

  function analyzeWhiteDominance(base64: string) {
    const bytes = toByteArray(base64);
    const decoded = decode(bytes, { useTArray: true });

    const { data, width, height } = decoded;

    let whitePixels = 0;
    let totalPixels = 0;

    // analyse beaucoup moins de pixels
    const pixelStep = 12;

    for (let y = 0; y < height; y += pixelStep) {
      for (let x = 0; x < width; x += pixelStep) {
        const i = (y * width + x) * 4;

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        totalPixels += 1;

        const isBright = r > 170 && g > 170 && b > 170;
        const isNeutral =
          Math.abs(r - g) < 35 && Math.abs(r - b) < 35 && Math.abs(g - b) < 35;

        if (isBright && isNeutral) {
          whitePixels += 1;
        }
      }
    }

    return whitePixels / totalPixels > 0.2;
  }

  async function handleOpenScanner() {
    if (!permission) return;

    if (!permission.granted) {
      const result = await requestPermission();
      if (!result.granted) return;
    }

    setMessage("");
    setCapturedUri(null);
    setShowCamera(true);
  }

  async function handleScan() {
    if (
      !cameraRef.current ||
      !isCameraReady ||
      isScanning ||
      hasWonRef.current
    ) {
      return;
    }

    try {
      setIsScanning(true);
      setMessage("Analyse...");

      const picture = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.25,
        skipProcessing: true,
      });

      if (!picture.base64 || !picture.uri) {
        setMessage("Photo invalide");
        return;
      }

      // on affiche la photo prise à la place du flux caméra
      setCapturedUri(picture.uri);

      const isWhite = analyzeWhiteDominance(picture.base64);

      if (isWhite) {
        handleWin();
      } else {
        setMessage("Ce n'est pas assez blanc");
      }
    } catch (error) {
      console.log(error);
      setMessage("Erreur caméra");
    } finally {
      setIsScanning(false);
    }
  }

  function handleRetry() {
    setCapturedUri(null);
    setMessage("");
  }

  return (
    <View style={styles.screen}>
      <Question title="Montre moi la couleur du cheval blanc d'Henry IV" />

      <View style={styles.answersContainer}>
        <Answers
          squared
          options={[
            { title: "Vert", onClick: handleWrongAnswer },
            { title: "Bleu", onClick: handleWrongAnswer },
            { title: "Jaune", onClick: handleWrongAnswer },
            { title: "Rouge", onClick: handleWrongAnswer },
          ]}
        />
      </View>

      <Pressable onPress={handleOpenScanner} style={styles.smallScannerButton}>
        <Text style={styles.smallScannerText}>Scanner</Text>
      </Pressable>

      {!!message && !showCamera && (
        <Text style={styles.questionMessage}>{message}</Text>
      )}

      {showCamera && (
        <View style={styles.cameraOverlay}>
          {!permission ? (
            <View style={styles.center}>
              <ActivityIndicator />
            </View>
          ) : !permission.granted ? (
            <View style={styles.center}>
              <Pressable style={styles.button} onPress={requestPermission}>
                <Text style={styles.buttonText}>Autoriser la caméra</Text>
              </Pressable>
            </View>
          ) : (
            <>
              {!capturedUri ? (
                <CameraView
                  ref={cameraRef}
                  style={StyleSheet.absoluteFillObject}
                  facing="back"
                  mode="picture"
                  onCameraReady={() => setIsCameraReady(true)}
                />
              ) : (
                <ExpoImage
                  source={{ uri: capturedUri }}
                  style={StyleSheet.absoluteFillObject}
                  contentFit="cover"
                />
              )}

              <View style={styles.bottomBar}>
                {!capturedUri ? (
                  <Pressable
                    style={[styles.button, isScanning && styles.buttonDisabled]}
                    onPress={handleScan}
                    disabled={isScanning}
                  >
                    <Text style={styles.buttonText}>
                      {isScanning ? "Scan..." : "Scanner"}
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable style={styles.button} onPress={handleRetry}>
                    <Text style={styles.buttonText}>Recommencer</Text>
                  </Pressable>
                )}

                <Pressable onPress={() => setShowCamera(false)}>
                  <Text style={styles.backText}>Retour</Text>
                </Pressable>

                {!!message && <Text style={styles.message}>{message}</Text>}
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  answersContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    minHeight: 0,
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    zIndex: 50,
    elevation: 50,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 32,
    alignItems: "center",
    gap: 12,
  },
  button: {
    backgroundColor: "#d62828",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  smallScannerButton: {
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  smallScannerText: {
    fontSize: 14,
    color: "black",
    textDecorationLine: "underline",
  },
  backText: {
    color: "white",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  message: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  questionMessage: {
    color: "white",
    fontSize: 14,
    marginBottom: 12,
  },
});
