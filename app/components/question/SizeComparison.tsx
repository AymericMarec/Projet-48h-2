import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { BUTTONS_DATA } from '../../data/buttons';

export default function VisualEnigma() {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handlePress = (size: number) => {
    const minSize = Math.min(...BUTTONS_DATA.map(b => b.size));
    setIsCorrect(size === minSize);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
      <Text>Clique sur le plus petit :</Text>
      
      <View style={{ flexDirection: 'row' }}>
        {BUTTONS_DATA.map((btn) => (
          <TouchableOpacity
            key={btn.id}
            onPress={() => handlePress(btn.size)}
            style={{ width: btn.size, height: btn.size, backgroundColor: 'grey', margin: 10 }}
          >
            <Text>{btn.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isCorrect === true && <Text>Gagné</Text>}
      {isCorrect === false && <Text>Perdu</Text>}
    </View>
  );
}