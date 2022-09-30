import { ValidateError } from "async-validator";
import { FormInstance } from "rc-field-form/es/interface";
import { ReactElement } from "react";
import {
  ButtonGroupProperties,
  LinkButtonProperties,
  NextQuestionButtonProperties,
  PromptProperties,
  Question,
  QuestionFieldProperties,
  RadioGroupProperties,
  SubmitButtonProperties,
  TextInputProperties,
  WarningProperties,
  SectionBlockProperties,
} from "../QuestionForm.types";

export interface QuestionFieldRenderProps<T> {
  question: Question<T>;
  onEndFormClickCallback: () => void;
}
export interface QuestionFieldProps {
  question: Question<QuestionFieldProperties>;
  questions: Question<QuestionFieldProperties>[];
  renderQuestion: (children: ReactElement) => ReactElement;
  values: Record<string, string | undefined>;
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
  renderSectionBlockField: (
    props: QuestionFieldRenderProps<SectionBlockProperties>
  ) => ReactElement;
}
