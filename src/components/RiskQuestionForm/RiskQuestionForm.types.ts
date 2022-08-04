import { ReactElement } from "react";
import { QuestionSchema } from "../QuestionForm/rc-field-form/QuestionForm.types";

export interface RiskQuestionFormSchema extends QuestionSchema {
  miscellaneous: {
    guidedQuestion: string;
  };
}
export interface RiskQuestionFormProps {
  schema: RiskQuestionFormSchema;
  onSubmitCallback: (results: RiskQuestionFormPayload) => void;
  onEndFormCallback: (results: Record<string, string | undefined>) => void;
  renderQuestion: (children: ReactElement) => ReactElement;
}

export type RiskQuestionFormPayload = {
  source: "ONLINE";
  guidedQuestion: string;
  answers: Array<{ name: string; answer: string | undefined }>;
};
