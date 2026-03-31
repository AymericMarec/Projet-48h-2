import { ComponentType } from "react";

export type BasicQuestion = {
  question: string;
  options: Array<string>;
  answer: string;
  type: "basic";
  /** Affichage grille 2×2 carrée si true ; liste verticale sinon */
  squared?: boolean;
};

export type InteractiveQuestion = {
  type: "interactive";
  component: ComponentType;
  title: string;
  needSkipButton: boolean;
};

export type Question = BasicQuestion | InteractiveQuestion;
