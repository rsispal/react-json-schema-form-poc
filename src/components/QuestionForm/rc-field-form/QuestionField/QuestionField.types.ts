import { ValidateError } from "async-validator";
import { FieldError, FormInstance } from "rc-field-form/es/interface";
import { ReactElement } from "react";
import { Question, QuestionFieldType } from "../QuestionForm.types";

export interface QuestionFieldProps {
  question: Question<QuestionFieldType>;
  questions: Question<QuestionFieldType>[];
  renderQuestion: (children: ReactElement) => ReactElement;
  values: Record<string, string | boolean | undefined>;
  errors: ValidateError[];
  form: FormInstance;
  onEndFormClickCallback: () => void;
}
