import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button_data_1 } from '../../data/buttons';

export default function VisualEnigma() {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handlePress = (size: number) => {
    const minSize = Math.min(...Button_data_1.map(b => b.size));
    setIsCorrect(size === minSize);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 50,  padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Énigme visuelle – Partie 1
      </Text>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}>
        Consigne : Clique sur le plus petit le plus rapidement possible.
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {Button_data_1.map((btn) => (
          <TouchableOpacity
            key={btn.id}
            onPress={() => handlePress(btn.size)}
            style={{ 
              width: btn.size, 
              height: btn.size, 
              backgroundColor: 'grey', 
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8 }}
          >
          <Text style={{ fontSize: btn.size / 2 }}>{btn.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ marginTop: 30, height: 40 }}>
        {isCorrect === true && (
          <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 18 }}>
            Gagné ! 
          </Text>
        )}
        {isCorrect === false && (
          <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 18 }}>
            Perdu !
          </Text>
        )}
      </View>
    </View>
  );
}