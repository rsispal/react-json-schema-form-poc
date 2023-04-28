import { FunctionComponent, HTMLAttributeAnchorTarget } from "react";
import { Rule } from "async-validator";

import { DynamicTextParagraph } from "../../../DynamicText/DynamicText.types";

export type QuestionSchema = {
  schemaVersionMajor: number;
  schemaVersionMinor: number;
  formName: string;
  miscellaneous: Record<string, any>;
  questions: Question<QuestionFieldProperties>[];
};

export type Question<T> = {
  /**
   * @property id {string} - a unique identifier for this question (for business reference, and used as React node key - uuidv4 recommended)
   */
  id: string;
  /**
   * @property name {string} - the name of the field which the value will be stored against
   */
  name: string;
  /**
   * @property exclude {boolean} - hide the question from rendering independently (i.e. for rendering dependency-style questions)
   */
  exclude: boolean;
  /**
   * @property type {SupportedFormField} - the kind of field to generate
   */
  type: SupportedFormField;
  /**
   * @property ui {boolean} - wrap the question in the UI wrapper via the QuestionField renderQuestion prop
   */
  ui?: boolean;
  /**
   * @property prompt {string} - question/prompt to show for this field (optional)
   */
  prompt?: string;
  /**
   * @property prompt {string} - question/prompt to show for this field (optional)
   */
  description?: DynamicTextParagraph[];
  /**
   * @property properties - field-specific configuration properties (see instructions)
   */
  properties: T;
  /**
   * @property validation {FieldProps["rules"] | undefined} - Async Validator static validation rules (functions not supported in JSON schemas)
   */
  validation?: Rule[];
  /**
   * @property next {NextFieldTransition[]} - value-based transition rules for question chaining (must be define for _all_ answers)
   */
  next?: NextFieldTransition[];
  /**
   * @property warnings {WarningProperties} - value-based warnings to display
   */
  warnings?: NextFieldTransition[];
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

export enum PreDefinedResponse {
  SELECTED = "SELECTED",
}

export enum SupportedFormField {
  LinkButton = "LinkButton",
  RadioGroup = "RadioGroup",
  TextInput = "TextInput",
  NextQuestionButton = "NextQuestionButton",
  ButtonGroup = "ButtonGroup",
  Prompt = "Prompt",
  Warning = "Warning",
  SubmitButton = "SubmitButton",
  SectionBlock = "SectionBlock",
}

export type QuestionFormSubmission = Record<string, string | undefined>;

export interface QuestionFormProps extends QuestionSchema {
  fields: Record<SupportedFormField, FunctionComponent<QuestionFieldWrapperProps<any>>>;
  questionFieldUI?: FunctionComponent<any>;
  initialValues?: QuestionFormSubmission;
  className?: string;
  submitOnChange?: boolean;
  onSubmitCallback: (values: QuestionFormSubmission) => void;
  onEndFormCallback: () => void;
}

export type QuestionFieldProperties =
  | RadioGroupProperties
  | TextInputProperties
  | LinkButtonProperties
  | NextQuestionButtonProperties
  | ButtonGroupProperties
  | PromptProperties
  | WarningProperties
  | SubmitButtonProperties
  | SectionBlockProperties;

export type QuestionFieldManagerProps = {
  fields: QuestionFormProps["fields"];
  questions: Question<QuestionFieldProperties>[];
  questionFieldUI: QuestionFormProps["questionFieldUI"];
  onSubmitFormCallback: () => void;
  onEndFormCallback: () => void;
  onResetFormCallback: () => void;
};

export type QuestionFieldProps = {
  fields: QuestionFormProps["fields"];
  question: Question<QuestionFieldProperties>;
  questions: Question<QuestionFieldProperties>[];
  previousQuestion: Question<QuestionFieldProperties> | undefined; // TODO: determine if this prop is necessary?
  nextQuestion: Question<QuestionFieldProperties> | undefined; // TODO: determine if this prop is necessary?
  questionFieldUI: QuestionFormProps["questionFieldUI"];
  onSubmitFormCallback: () => void;
  onEndFormCallback: () => void;
  onResetFormCallback: () => void;
};

export type QuestionFieldWrapperProps<T> = {
  question: Question<T>;
  value: string | undefined;
  error?: string | undefined;
  onSubmitFormCallback: () => void;
  onEndFormCallback: () => void;
  onResetFormCallback: () => void;
};

export type RadioGroupProperties = {
  disabled: boolean;
  options: { value: string; label: string }[];
};
export type TextInputProperties = {
  disabled: boolean;
  placeholder?: string;
  initialValue?: string | null;
};

export type LinkButtonProperties = {
  disabled: boolean;
  label: string;
  url: string;
  target: HTMLAttributeAnchorTarget;
  analyticsEnabled: boolean;
  analyticsDescription: string | undefined;
};

export type NextQuestionButtonProperties = {
  disabled: boolean;
  label: string;
};

export type ButtonGroupProperties = {
  buttons: Question<LinkButtonProperties | NextQuestionButtonProperties | SubmitButtonProperties>[];
};

export type PromptProperties = {
  prompt: DynamicTextParagraph[];
  continueButtonLabel: string;
  endFormButtonLabel: string;
  showEndFormButton: boolean;
};

export type WarningProperties = {
  prompt: DynamicTextParagraph[];
  continueButtonLabel: string;
  endFormButtonLabel: string;
  showEndFormButton: boolean;
};

export type SubmitButtonProperties = {
  disabled: boolean;
  title: string;
  subtitle: string;
  buttonLabel: string;
};

export type SectionBlockProperties = {
  title: string;
  description?: DynamicTextParagraph[];
};
