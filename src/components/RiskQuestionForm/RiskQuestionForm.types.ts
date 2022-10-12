import { QuestionSchema } from "../QuestionForm/formik/QuestionForm.types";

export type RiskQuestionFormSchema = QuestionSchema & {
  miscellaneous: {
    guided_question: string;
  };
};
export interface RiskQuestionFormProps {
  schema: RiskQuestionFormSchema;
  initialValues?: Record<string, string | undefined>;
  onSubmitCallback: (results: RiskQuestionFormPayload) => void;
  onEndFormCallback: (results: Record<string, string | undefined>) => void;
}

export type RiskQuestionFormPayload = {
  source: "ONLINE";
  guided_question: string;
  answers: Array<{ name: string; answer: string | undefined }>;
};
