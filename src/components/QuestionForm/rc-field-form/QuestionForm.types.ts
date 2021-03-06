import { HTMLAttributeAnchorTarget, ReactElement } from "react";
import { FieldProps } from "rc-field-form/es/Field";
import { DynamicTextParagraph } from "../../DynamicText/DynamicText.types";
import { QuestionFieldRenderProps } from "./QuestionField/QuestionField.types";
import { ValidateError } from "async-validator";

export type QuestionSchema = {
  schemaVersionMajor: number;
  schemaVersionMinor: number;
  formName: string;
  questions: Question<QuestionFieldType>[];
};

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
  renderLinkButtonField: (
    props: QuestionFieldRenderProps<LinkButtonProperties>
  ) => ReactElement;
  renderRadioGroupField: (
    props: QuestionFieldRenderProps<RadioGroupProperties>
  ) => ReactElement;
  renderTextInputField: (
    props: QuestionFieldRenderProps<TextInputProperties>
  ) => ReactElement;
  renderNextQuestionButtonField: (
    props: QuestionFieldRenderProps<NextQuestionButtonProperties>
  ) => ReactElement;
  renderButtonGroupField: (
    props: QuestionFieldRenderProps<ButtonGroupProperties>
  ) => ReactElement;
  renderPromptField: (
    props: QuestionFieldRenderProps<PromptProperties>
  ) => ReactElement;
  renderWarningField: (
    props: QuestionFieldRenderProps<WarningProperties>
  ) => ReactElement;
  renderFieldErrorMessage: (error: ValidateError) => ReactElement;
  renderSubmitButtonField: (
    props: QuestionFieldRenderProps<SubmitButtonProperties>
  ) => ReactElement;
}

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

export enum SupportedFormField {
  LinkButton = "LinkButton",
  RadioGroup = "RadioGroup",
  TextInput = "TextInput",
  NextQuestionButton = "NextQuestionButton",
  ButtonGroup = "ButtonGroup",
  Prompt = "Prompt",
  Warning = "Warning",
  SubmitButton = "SubmitButton",
}

export type QuestionFieldType =
  | RadioGroupProperties
  | TextInputProperties
  | LinkButtonProperties
  | NextQuestionButtonProperties
  | ButtonGroupProperties
  | PromptProperties
  | WarningProperties
  | SubmitButtonProperties;

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
};

export type NextQuestionButtonProperties = {
  disabled: boolean;
  label: string;
};

export type ButtonGroupProperties = {
  buttons: Question<
    LinkButtonProperties | NextQuestionButtonProperties | SubmitButtonProperties
  >[];
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
  label: string;
};
