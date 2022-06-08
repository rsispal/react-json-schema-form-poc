import { ReactElement } from "react";
import { QuestionSchema } from "../QuestionForm/rc-field-form/QuestionForm.types";

export interface RiskQuestionFormProps {
  schema: QuestionSchema;
  onSubmitCallback: (
    results: Record<string, string | boolean | undefined>
  ) => void;
  onEndFormCallback: (
    results: Record<string, string | boolean | undefined>
  ) => void;
  renderQuestion: (children: ReactElement) => ReactElement;
}
