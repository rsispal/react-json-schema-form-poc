import { FormInstance, NamePath } from "rc-field-form/es/interface";
import { ReactElement } from "react";
import { Question } from "../QuestionForm.types";

export interface QuestionFieldProps {
  question: Question;
  questions: Question[];
  renderQuestion: (children: ReactElement) => ReactElement;
  values: Record<string, string | undefined>;
  form: FormInstance;
  onEndFormClickCallback: () => void;
}
