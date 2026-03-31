import { ComponentType } from "react";

export type BasicQuestion = {
  question: string;
  options: Array<string>;
  answer: string;
  type: "basic";
  squared?: boolean;
};

export type InteractiveQuestion = {
  type: "interactive";
  component: ComponentType;
  title: string;
  needSkipButton: boolean;
  squared?: boolean;
};

export type Question = BasicQuestion | InteractiveQuestion;
