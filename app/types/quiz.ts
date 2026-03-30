import { Component, ComponentType } from "react"

export type BasicQuestion = {
    question:string
    options:Array<string>
    answer:string
    type:"basic"
}
export type InteractiveQuestion = {
    component:ComponentType
    needSkipButton:boolean
    type:"interactive"
}

export type Question = BasicQuestion | InteractiveQuestion;