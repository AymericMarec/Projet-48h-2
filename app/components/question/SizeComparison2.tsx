import React, { useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '@/assets/style/button.styles';
import { quizStyles } from '@/assets/style/quiz.styles';
import { useQuiz } from '@/app/context/quizContext';
import { router } from 'expo-router';

  const Button_data = [
  { id: 1, buttonSize: 90, emoji: '🚗', realSize: 400 },
  { id: 2, buttonSize: 110, emoji: '🛼', realSize: 30 },
  { id: 3, buttonSize: 60, emoji: '✈️', realSize: 3000 },
  { id: 4, buttonSize: 80, emoji: '🚲', realSize: 200 },
];

export default function VisualEnigma2() {
  const { loseLife, nextQuestion } = useQuiz();
  const hasWonRef = useRef(false); 

   const colors = ['red', 'blue', 'yellow', 'green'];

  const handlePress = (realSize: number) => {
    if (hasWonRef.current) return;
    const maxRealSize = Math.max(...Button_data.map(obj => obj.realSize));

    if(realSize === maxRealSize){
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
        Clique sur le plus grand.
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
              onPress={() => handlePress(btn.realSize)}
              disabled={hasWonRef.current}
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
    </View>
  );
}