import { useState } from "react";
import { Button, Pressable, View, Text } from "react-native";

export default function DoorBellQuestion(){
    function win(){
        //Gestion de victoire
    }

    return (
        <View>
            <Text>Il y a quelqu’un ?</Text>
            <Pressable onLongPress={win}>
                <Text>.</Text>
            </Pressable>
        </View>
    )
}