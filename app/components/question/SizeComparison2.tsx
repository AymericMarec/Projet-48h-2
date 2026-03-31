import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '@/assets/style/button.styles';
import { QuizBackground } from '../ui/QuizBackground';
import { quizStyles } from '@/assets/style/quiz.styles';

export default function VisualEnigma2() {
  const Button_data = [
  { id: 1, buttonSize: 90, emoji: '🚗', realSize: 400 },
  { id: 2, buttonSize: 110, emoji: '🛼', realSize: 30 },
  { id: 3, buttonSize: 60, emoji: '✈️', realSize: 3000 },
  { id: 4, buttonSize: 80, emoji: '🚲', realSize: 200 },
];
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
   const colors = ['red', 'blue', 'yellow', 'green'];

  const handlePress = (realSize: number) => {
    const maxRealSize = Math.max(...Button_data.map(obj => obj.realSize));
    setIsCorrect(realSize === maxRealSize);
  };

  return (
    <View style={quizStyles.container}>
      <Text style={quizStyles.questionTitle}>
        Énigme visuelle - Partie 2
      </Text>
      <Text style={quizStyles.title}>
        Consigne : Clique sur le plus grand le plus rapidement possible.
      </Text>

      <View style={{ 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        width: 280,
        alignItems: 'center',
      }}>
        {Button_data.map((btn, index) => {
          const colorKey = colors[index % colors.length];
          
          return (
            <TouchableOpacity
              key={btn.id}
              onPress={() => handlePress(btn.realSize)}
              style={[
                styles.base, 
                styles[colorKey as keyof typeof styles],
                  {
                  width: btn.buttonSize, 
                  height: btn.buttonSize, 
                  margin: 15 
                }
                ]}
            >
              <Text style={{ fontSize: btn.buttonSize / 2 }}>
                {btn.emoji}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{ marginTop: 30, height: 40 }}>
        {isCorrect === true && <Text style={[styles.text, {color: 'green'}]}>Gagné !</Text>}
        {isCorrect === false && <Text style={[styles.text, {color: 'red'}]}>Perdu !</Text>}
      </View>
    </View>
  );
}