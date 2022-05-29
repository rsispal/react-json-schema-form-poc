import { FieldProps } from "rc-field-form/es/Field";
import { HTMLAttributeAnchorTarget, ReactElement } from "react";

export interface QuestionFormProps extends QuestionSchema {
  showAllQuestions?: boolean;
  onSubmitCallback: (results: Record<string, string | undefined>) => void;
  renderQuestion: (children: ReactElement) => ReactElement;
}

export type RadioGroupProperties = {
  name: string;
  disabled: boolean;
  options: { value: string; label: string }[];
};
export type TextInputProperties = {
  name: string;
  disabled: boolean;
  options: { value: string; placeholder: string }[];
};

export type LinkButtonProperties = {
  name: string;
  disabled: boolean;
  label: string;
  url: string;
  target: HTMLAttributeAnchorTarget;
};

export type NextQuestionButtonProperties = {
  name: string;
  disabled: boolean;
  label: string;
};

export enum SupportedFormField {
  LinkButton = "LinkButton",
  RadioGroup = "RadioGroup",
  TextInput = "TextInput",
  NextQuestionButton = "NextQuestionButton",
  ButtonGroup = "ButtonGroup",
}

export type FormField = {
  type: SupportedFormField;
  prompt: string;
  properties: LinkButtonProperties | RadioGroupProperties | TextInputProperties;
  validation?: FieldProps["rules"];
  next?: NextFieldTransition[];
  warnings?: WarningProperties[];
};

export type NextFieldTransition = {
  /**
   * @property equals {string | string[]} - the value(s) that the parent question needs to equal before satisfying the condition
   */
  equals?: string | string[] | boolean;
  /**
   * @property valid {boolean} - the parent question response validation state before satisfying the condition
   */
  valid?: boolean;
  /**
   * @property childQuestionID {string} - the question field to render when the condition is satisfied
   */
  question: string;
};

export type WarningProperties = {
  equals: string;
  prompt: string;
};

export type Question = {
  /**
   * @property id {string} - a unique identifier for this question (for reference only - uuidv4 recommended)
   */
  id: string;
  /**
   * @property order {number} - a numeric value used to order the questions
   */
  order: number;
  /**
   * @property isChildQuestion {boolean} - hide the question from rendering independently (ideal for child questions)
   */
  isChildQuestion: boolean;
  /**
   * @property field {FormField} - field configuration for this question
   */
  field: FormField;
};

export type QuestionSchema = {
  __version: number;
  formName: string;
  submitButton: {
    label: string;
  };
  questions: Question[];
};
