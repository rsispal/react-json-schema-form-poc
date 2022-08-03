import { ReactElement } from "react";
import { QuestionSchema } from "../QuestionForm/rc-field-form/QuestionForm.types";

export interface RiskQuestionFormProps {
  schema: QuestionSchema;
  onSubmitCallback: (results: Record<string, string | undefined>) => void;
  onEndFormCallback: (results: Record<string, string | undefined>) => void;
  renderQuestion: (children: ReactElement) => ReactElement;
}
