import { useEffect } from "react";
import { View,Text, Pressable, Button } from "react-native";
import StressEffect from "../stressEffect";

export default function StandardQuestion(){
    useEffect(() => {
        const timer = setTimeout(() => {
             // Gerer la gestion de victoire
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    function onClickLoose(){
        // Gerer la gestion de defaite
    }

    return (
        <View style={{ flex: 1 }}>
            <StressEffect/>
            <Text>Cliquez le plus rapidement possible sur aucun bouton</Text>
            <Pressable>
                <Button title="Clique ici" onPress={onClickLoose}/>
            </Pressable>
        </View>
    )
}
