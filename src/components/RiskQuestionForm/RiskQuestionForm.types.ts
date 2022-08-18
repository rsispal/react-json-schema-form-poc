import { ReactElement } from "react";
import { QuestionSchema } from "../QuestionForm/rc-field-form/QuestionForm.types";

export interface RiskQuestionFormSchema extends QuestionSchema {
  miscellaneous: {
    guided_question: string;
  };
}
export interface RiskQuestionFormProps {
  schema: RiskQuestionFormSchema;
  onSubmitCallback: (results: RiskQuestionFormPayload) => void;
  onEndFormCallback: (results: Record<string, string | undefined>) => void;
}

export type RiskQuestionFormPayload = {
  source: "ONLINE";
  guided_question: string;
  answers: Array<{ name: string; answer: string | undefined }>;
};
