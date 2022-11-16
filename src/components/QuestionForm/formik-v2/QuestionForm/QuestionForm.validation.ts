import { FormikErrors } from "formik";
import {
  Question,
  QuestionFieldProperties,
  QuestionFormSubmission,
} from "../types";

export const validate = (
  values: QuestionFormSubmission,
  questions: Question<QuestionFieldProperties>[]
): FormikErrors<QuestionFormSubmission> => {
  let errors: FormikErrors<QuestionFormSubmission> = {
    // Q1: "This is a test error for Q1",
    // Q1_1_N: "This is a test error for Q1_1_N",
    // Q1A: "This is a test error for Q1A",
    // Q2: "This is a test error for Q2",
    // Q3: "This is a test error for Q3",
  };

  // For each key k in values, check that the answer complies with the question type, or add error E as key-value in errors object

  return errors;
};
