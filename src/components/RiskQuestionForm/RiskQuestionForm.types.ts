import { QuestionSchema } from "../QuestionForm/formik-v2/types";

export type RiskQuestionFormSchema = QuestionSchema & {
  miscellaneous: {
    guided_question: string;
  };
};
export interface RiskQuestionFormProps {
  schema: RiskQuestionFormSchema;
  initialValues?: Record<string, string | undefined>;
  onSubmitCallback: (results: RiskQuestionFormPayload) => void;
  onEndFormCallback: () => void;
}

export type RiskQuestionFormPayload = {
  source: "ONLINE";
  guided_question: string;
  answers: Array<{ name: string; answer: string | undefined }>;
};
