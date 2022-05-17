import { HTMLAttributeAnchorTarget } from "react";

export interface QuestionFormProps {
  questions: Question[];
  onSubmitCallback: (results: Record<string, string | undefined>) => void;
}

export type RadioGroupProperties = { name: string; disabled: boolean; options: { value: string; label: string }[] };

export type LinkButtonProperties = {
  name: string;
  disabled: boolean;
  label: string;
  url: string;
  target: HTMLAttributeAnchorTarget;
};

export enum SupportedFormField {
  LinkButton = "LinkButton",
  RadioGroup = "RadioGroup",
}

export type FormField = {
  type: SupportedFormField;
  prompt: string;
  properties: LinkButtonProperties | RadioGroupProperties;
  validation?: Record<string, any>[];
  dependants?: DependantField[];
  warnings?: WarningProperties[];
};

export type DependantField = {
  /**
   * @property equals {string | string[]} - the value(s) that the parent question needs to equal before satisfying the condition
   */
  equals: string | string[];
  /**
   * @property childQuestionID {string} = the question field to render when the condition is satisfied
   */
  child: string;
};

export type WarningProperties = {
  equals: string;
  prompt: string;
};

export type Question = {
  id: string;
  order: number;
  /**
   * @property exclude {boolean} - hide the question from rendering independently (ideal for one-off dependants)
   */
  exclude: boolean;
  field: FormField;
};
