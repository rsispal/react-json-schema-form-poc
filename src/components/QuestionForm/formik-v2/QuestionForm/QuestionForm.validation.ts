import Schema, { Rules, Rule, ValidateError, ValidateFieldsError } from "async-validator";
import { FormikErrors } from "formik";
import { Question, QuestionFieldProperties, QuestionFormSubmission } from "../types";

export const validate = async (
  values: QuestionFormSubmission,
  questions: Question<QuestionFieldProperties>[]
): Promise<FormikErrors<QuestionFormSubmission>> => {
  let errors: FormikErrors<QuestionFormSubmission> = {};

  const questionNames = Object.keys(values);

  const answeredQuestions = questions.filter((question) => questionNames.includes(question.name));

  const validationRules: Rules = {};

  answeredQuestions.forEach((question) => (validationRules[question.name] = (question.validation as Rule | undefined) ?? []));

  const validator = new Schema(validationRules);
  const formErrors: ValidateError[] = [];

  await validator.validate(values).catch(({ errors }: { errors: ValidateError[] | null; fields: ValidateFieldsError }) => {
    if (errors) {
      formErrors.push(...errors);
    }
  });

  formErrors.map((error) => (errors[error.field as string] = error.message));

  return errors;
};
