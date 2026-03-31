import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '@/assets/style/button.styles';
import { quizStyles } from '@/assets/style/quiz.styles';
import { useQuiz } from '@/app/context/quizContext';
import { router } from 'expo-router';

const Button_data = [
  { id: 1, size: 55, emoji: '🐘' },
  { id: 2, size: 90, emoji: '🐭' },
  { id: 3, size: 75, emoji: '🐶' },
  { id: 4, size: 110, emoji: '🐱' },
];

export default function VisualEnigma1() {
  const { loseLife, nextQuestion } = useQuiz();
  const hasWonRef = useRef(false);

  const colors = ['red', 'blue', 'yellow', 'green'];

  const handlePress = (size: number) => {
    if (hasWonRef.current) return;
    const minSize = Math.min(...Button_data.map(b => b.size));

    if (size === minSize) {
      hasWonRef.current = true;
      setTimeout(() => {
        nextQuestion(); 
        router.push("/quiz"); 
      }, 1000);
    } else {
      loseLife(); 
    }
  };

  return (
    <View style={quizStyles.container}>
      <Text style={quizStyles.title}>
        Clique sur le plus petit.
      </Text>

      <View style={{ 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        width: 280,
        alignItems: 'center',
        alignSelf: 'center'
      }}>
        {Button_data.map((btn, index) => {
          const colorKey = colors[index % colors.length]; 
          
          return (
            <TouchableOpacity 
              key={btn.id}
              onPress={() => handlePress(btn.size)}
              disabled={hasWonRef.current}
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

      
    </View>
  );
}