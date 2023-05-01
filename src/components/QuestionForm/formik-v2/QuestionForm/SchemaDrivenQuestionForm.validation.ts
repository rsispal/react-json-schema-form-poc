import Schema, { Rules, Rule, ValidateError, ValidateFieldsError } from "async-validator";
import { FormikErrors } from "formik";
import { Question, QuestionFieldProperties, SchemaDrivenQuestionFormSubmission } from "../types";

export const validate = async (
  values: SchemaDrivenQuestionFormSubmission,
  questions: Question<QuestionFieldProperties>[]
): Promise<FormikErrors<SchemaDrivenQuestionFormSubmission>> => {
  let formErrors: FormikErrors<SchemaDrivenQuestionFormSubmission> = {};

  const questionNames = Object.keys(values);

  const answeredQuestions = questions.filter((question) => questionNames.includes(question.id));

  const validationRules: Rules = {};

  answeredQuestions.forEach((question) => (validationRules[question.id] = (question.validation as Rule | undefined) ?? []));

  const validator = new Schema(validationRules);
  const validationErrors: ValidateError[] = [];

  await validator.validate(values).catch(({ errors }: { errors: ValidateError[] | null; fields: ValidateFieldsError }) => {
    if (errors) {
      validationErrors.push(...errors);
    }
  });

  validationErrors.map((error) => (formErrors[error.field as string] = error.message));

  return formErrors;
};
