import { Question } from "@/app/types/quiz";
import DoNotPressQuestion from "../components/question/DoNotPressQuestion";
import SoundQuestion from "../components/question/SoundQuestion";
import HiddenCat from "../components/question/HiddenCat";
import DoorBellQuestion from "../components/question/DoorBellQuestion";
import ShakeQuestion from "../components/question/ShakeQuestion";
import DeficientButton from "../components/question/DeficientButton";
import SwipeQuestion from "../components/question/SwipeQuestion";
import FindWhiteQuestion from "../components/question/FindWhiteQuestion";
import LightQuestion from "../components/question/LightQuestion";

const mappingQuestion:Record<string,Question> = {
    "BearQuestion" : {
        type:"interactive",
        component: SoundQuestion,
        needSkipButton: true,
        title: "Fais fuir l'ours",
    },
    "DoNotPressButton" : {
        type: "interactive",
        component: DoNotPressQuestion,
        needSkipButton: false,
        title: "Cliquez le plus rapidement possible sur aucun bouton",
    },
    "DoorBellQuestion" : {
        type: "interactive",
        component: DoorBellQuestion,
        needSkipButton: false,
        title: "Il y a quelqu’un ?",
    },
    "HiddenCat" : {
        type: "interactive",
        component: HiddenCat,
        needSkipButton: false,
        title: "Trouve le chat le plus a gauche",
    },
    "ShakeQuestion" : {
        type: "interactive",
        component: ShakeQuestion,
        needSkipButton: true,
        title: "",
    },
    "SwipeQuestion" : {
        type: "interactive",
        component: SwipeQuestion,
        needSkipButton: false,
        title: "Glisse vers la gauche",
    },
    "DeficientButton" : {
        type: "interactive",
        component: DeficientButton,
        needSkipButton: false,
        title: "Clique sur le bon bouton",
    },
    "MonthsQuestion" : {
      type: "basic",
      question: "Combien de mois ont 28 jours ?",
      options: ["1", "0", "6", "12"],
      answer: "12",
    },
    "GN question" : {
      type: "basic",
      question: "Combien y a-t-il de lettres entre “G” et “N” ?",
      options: ["2", "4", "6", "8"],
      answer: "2",
    },
    "ErrorQuestion" : {
      type: "basic",
      question: "Combient y a-t-il de fautes dans cette queston ?",
      options: ["1", "2", "0", "4"],
      answer: "2",
    },
    "FishQuestion" : {
      type: "basic",
      question: "Lequel de ces poissons n’existe pas ?",
      options: [
        "Le poisson-revenant",
        "Le grondin perlon",
        "Le crapaud de mer",
        "Le goujon à lunettes",
      ],
      answer: "Le goujon à lunettes",
    },
    "PlaneQuestion" : {
      type: "basic",
      question: "Si un avion s’écrase exactement sur la frontière entre la France et la Belgique, où enterre-t-on les survivants ?",
      options: [
        "En France",
        "On ne les enterre pas",
        "Dans leur pays d’origine",
        "En Belgique",
      ],
      answer: "On ne les enterre pas",
    },
    "AnimalQuestion": {
      type: "basic",
      question: "Lequel de ces animaux n’est pas un mammifère ?",
      options: [
        "La chauve-souris",
        "Le requin-baleine",
        "L’ornithorynque",
        "Le dauphin"
      ],
      answer: "Le requin-baleine",
    },
    "TrainQuestion": {
      type: "basic",
      question: "Si un train électrique va vers le Nord et que le vent souffle vers le Sud, de quel côté va la fumée ?",
      options: [
        "Elle monte",
        "Vers le Nord",
        "Il n’y a pas de fumée",
        "Vers le Sud"
      ],
      answer: "Il n’y a pas de fumée",
    },
    "MetaQuestion": {
      type: "basic",
      question: "Laquelle de ces options est la bonne ?",
      options: [
        "Réponse B",
        "Réponse A",
        "La réponse C",
        "Aucune des réponses"
      ],
      answer: "La réponse C",
    },
    "LetterQuestion": {
      type: "basic",
      question: "Je commence par “e”, je finis par “e”, mais je ne contiens qu’une seule lettre. Qui suis-je ?",
      options: [
        "Une ellipse",
        "Une enveloppe",
        "Une éponge",
        "Le mot “E”"
      ],
      answer: "Une enveloppe",
    },
    "MachineQuestion": {
      type: "basic",
      question: "Si 5 machines mettent 5 minutes pour fabriquer 5 gadgets, combien de temps pour 100 machines pour 100 gadgets ?",
      options: [
        "1 minute",
        "5 minutes",
        "500 minutes",
        "100 minutes"
      ],
      answer: "5 minutes",
    },
    "LightQuestion" : {
      type: "interactive",
      component: LightQuestion,
      needSkipButton: true,
      title: "Comment on décroche le téléphone ?",
    },
    "FindWhiteQuestion" : {
      type: "interactive",
      component: FindWhiteQuestion,
      needSkipButton: true,
      title: "Montre moi la couleur du cheval blanc d'Henry IV",
    },

}


export const questions: Record<string, Array<Question>> = {
    "1": [ // Série de question numero un
      mappingQuestion["MonthsQuestion"],
      mappingQuestion["GN question"],
      mappingQuestion["DeficientButton"],
      mappingQuestion["BearQuestion"],
      mappingQuestion["FindWhiteQuestion"],
      mappingQuestion["ErrorQuestion"],
      mappingQuestion["SwipeQuestion"],
      mappingQuestion["LightQuestion"],
      mappingQuestion["PlaneQuestion"],
      mappingQuestion["FishQuestion"],
  ],

};