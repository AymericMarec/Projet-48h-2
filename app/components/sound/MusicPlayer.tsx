import { useEffect } from "react";
import { Audio } from "expo-av";

export default function MusicPlayer() {
  useEffect(() => {
    let sound: Audio.Sound;

    async function playSound() {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("@/assets/sound/mainTheme.mp3"),
        { shouldPlay: true, isLooping: true ,volume: 0.2}
      );
      sound = newSound;
    }

    playSound();

    return () => {
      sound?.unloadAsync();
    };
  }, []);

  return null;
}