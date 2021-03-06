import { ValidateError } from "async-validator";
import { FieldError, FormInstance } from "rc-field-form/es/interface";
import { ReactElement } from "react";
import {
  ButtonGroupProperties,
  LinkButtonProperties,
  NextQuestionButtonProperties,
  PromptProperties,
  Question,
  QuestionFieldType,
  RadioGroupProperties,
  SubmitButtonProperties,
  TextInputProperties,
  WarningProperties,
} from "../QuestionForm.types";

export interface QuestionFieldRenderProps<T> {
  question: Question<T>;
  onEndFormClickCallback: () => void;
}
export interface QuestionFieldProps {
  question: Question<QuestionFieldType>;
  questions: Question<QuestionFieldType>[];
  renderQuestion: (children: ReactElement) => ReactElement;
  values: Record<string, string | boolean | undefined>;
  errors: ValidateError[];
  form: FormInstance;
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
