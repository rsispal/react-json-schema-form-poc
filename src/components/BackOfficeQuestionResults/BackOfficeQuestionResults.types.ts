import { QuestionSchema } from "../QuestionForm/rc-field-form/QuestionForm.types";

export interface BackOfficeQuestionResultsProps {
    answers: Record<string, string | undefined>,
    schema: QuestionSchema;
}