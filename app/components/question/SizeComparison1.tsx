import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '@/assets/style/button.styles';
import { QuizBackground } from '../ui/QuizBackground';
import { quizStyles } from '@/assets/style/quiz.styles';

export default function VisualEnigma1() {
  const Button_data = [
  { id: 1, size: 60, emoji: '🐘'},
  { id: 2, size: 90, emoji: '🐭'},
  { id: 3, size: 80, emoji: '🐶'},
  { id: 4, size: 110, emoji: '🐱'},
];
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const colors = ['red', 'blue', 'yellow', 'green'];

  const handlePress = (size: number) => {
    const minSize = Math.min(...Button_data.map(b => b.size));
    setIsCorrect(size === minSize);
  };

  return (
    <View style={quizStyles.container}>
      <Text style={quizStyles.questionTitle}>
        Énigme visuelle - Partie 1
      </Text>
      <Text style={quizStyles.title}>
        Consigne : Clique sur le plus petit le plus rapidement possible.
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
              onPress={() => handlePress(btn.size)}
              style={[
                styles.base, 
                styles[colorKey as keyof typeof styles],
                {
                  width: btn.size, 
                  height: btn.size, 
                  margin: 15 
                }
              ]}
            >
              <Text style={{ fontSize: btn.size / 2 }}>
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