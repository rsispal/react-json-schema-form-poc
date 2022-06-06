import { FieldProps } from "rc-field-form/es/Field";
import { HTMLAttributeAnchorTarget, ReactElement } from "react";
import { TextItem, URLItem } from "../../DynamicText/DynamicText.types";

export interface QuestionFormProps extends QuestionSchema {
  showAllQuestions?: boolean;
  onChangeCallback?: (
    results: Record<string, string | boolean | undefined>
  ) => void;
  onSubmitCallback: (
    results: Record<string, string | boolean | undefined>
  ) => void;
  renderQuestion: (children: ReactElement) => ReactElement;
  onEndFormClickCallback: () => void;
}

export enum SupportedFormField {
  LinkButton = "LinkButton",
  RadioGroup = "RadioGroup",
  TextInput = "TextInput",
  NextQuestionButton = "NextQuestionButton",
  ButtonGroup = "ButtonGroup",
  Prompt = "Prompt",
  Warning = "Warning",
  // TODO:
  SubmitButton = "SubmitButton",
}

export type RadioGroupProperties = {
  disabled: boolean;
  options: { value: string; label: string }[];
};
export type TextInputProperties = {
  disabled: boolean;
  options: { value: string; placeholder: string }[];
};

export type LinkButtonProperties = {
  disabled: boolean;
  label: string;
  url: string;
  target: HTMLAttributeAnchorTarget;
};

export type NextQuestionButtonProperties = {
  disabled: boolean;
  label: string;
};

export type ButtonGroupProperties = {
  buttons: Question[];
};

export type PromptProperties = {
  prompt: (TextItem | URLItem)[];
  continueButtonLabel: string;
  endButtonLabel: string;
};

export type WarningProperties = {
  prompt: (TextItem | URLItem)[];
  continueButtonLabel: string;
  endButtonLabel: string;
};

export type FormField = {
  type: SupportedFormField;
  prompt?: string;
  properties:
    | LinkButtonProperties
    | RadioGroupProperties
    | TextInputProperties
    | NextQuestionButtonProperties
    | ButtonGroupProperties
    | PromptProperties;
  validation?: FieldProps["rules"];
  next?: NextFieldTransition[];
  warnings?: NextFieldTransition[];
};

export type NextFieldTransition = {
  /**
   * @property equals {string | string[]} - the value(s) that the parent question needs to equal before satisfying the condition
   */
  equals?: string | string[] | boolean;
  /**
   * @property childQuestionID {string} - the question field to render when the condition is satisfied
   */
  question: string;
};

export type Question = {
  /**
   * @property id {string} - a unique identifier for this question (for reference only - uuidv4 recommended)
   */
  id: string;
  name: string;
  /**
   * @property order {number} - a numeric value used to order the questions
   */
  order: number;
  /**
   * @property isChildQuestion {boolean} - hide the question from rendering independently (ideal for child questions)
   */
  isChildQuestion: boolean;
  /**
   * @property type {SupportedFormField} - the kind of field to generate
   */
  type: SupportedFormField;
  /**
   * @property prompt {string} - question/prompt to show for this field (optional)
   */
  prompt?: string;
  /**
   * @property properties - field-specific configuration properties (see instructions)
   */
  properties:
    | LinkButtonProperties
    | RadioGroupProperties
    | TextInputProperties
    | NextQuestionButtonProperties
    | ButtonGroupProperties
    | PromptProperties;
  /**
   * @property validation {Rule[] | undefined} - Async Validator static validation rules (functions not supported in JSON schemas)
   */
  validation?: FieldProps["rules"];
  /**
   * @property next {NextFieldTransition[]} - value-based transition rules for question chaining (must be define for _all_ answers)
   */
  next?: NextFieldTransition[];
  /**
   * @property warnings {WarningProperties} - value-based warnings to display
   */
  warnings?: NextFieldTransition[];
};

export type QuestionSchema = {
  __version: number;
  formName: string;
  submitButton: {
    label: string;
  };
  questions: Question[];
};
