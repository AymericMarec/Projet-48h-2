import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button_data_2 } from '../../data/buttons';

export default function EnigmeVisuelle2() {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handlePress = (realSize: number) => {
    const maxRealSize = Math.max(...Button_data_2.map(obj => obj.realSize));
    setIsCorrect(realSize === maxRealSize);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 50, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Énigme visuelle – Partie 2
      </Text>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}>
        Consigne : Clique sur le plus grand le plus rapidement possible.
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {Button_data_2.map((btn) => (
          <TouchableOpacity
            key={btn.id}
            onPress={() => handlePress(btn.realSize)}
            style={{ 
              width: btn.buttonSize, 
              height: btn.buttonSize, 
              backgroundColor: 'lightgrey', 
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8
            }}
          >
            <Text style={{ fontSize: btn.buttonSize / 2 }}>{btn.emoji}</Text>
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