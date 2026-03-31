import { useState } from "react";
import { Button, Pressable, View } from "react-native";
import AppText from "@/app/components/ui/AppText";

export default function DoorBellQuestion(){
    function win(){
        //Gestion de victoire
    }

    return (
        <View>
            <AppText>Il y a quelqu’un ?</AppText>
            <Pressable onLongPress={win}>
                <AppText>.</AppText>
            </Pressable>
        </View>
    )
}