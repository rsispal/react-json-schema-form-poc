import Schema, {
  Rule,
  Rules,
  ValidateError,
  ValidateFieldsError,
} from "async-validator";
import {
  NextFieldTransition,
  Question,
  QuestionFieldProperties,
  RadioGroupProperties,
  SupportedFormField,
  WarningProperties,
} from "./QuestionForm.types";

export namespace QuestionFormUtilities {
  export const getFirstQuestion = (
    questions: Question<QuestionFieldProperties>[]
  ) => questions.at(0);

  export const getLastQuestion = (
    questions: Question<QuestionFieldProperties>[]
  ) => questions.at(questions.length - 1);

  export const getAllParentQuestions = (
    questions: Question<QuestionFieldProperties>[]
  ) => questions.filter(({ exclude }) => exclude === false);

  export const getQuestionByName = (
    questions: Question<QuestionFieldProperties>[],
    name: string
  ) => questions.filter((q) => q.name === name).at(0);

  export const getChildQuestionsForParent = (
    parentQuestion: Question<QuestionFieldProperties>,
    questions: Question<QuestionFieldProperties>[],
    transitions: NextFieldTransition[] | undefined,
    currentValue: string | undefined,
    errors: ValidateError[]
  ) => {
    return questions.filter((question) =>
      (transitions || [])
        .filter((transition) => {
          if (parentQuestion.type === SupportedFormField.SectionBlock) {
            return true;
          }
          if (transition.hasOwnProperty("equals")) {
            if (currentValue === transition.equals) {
              return true;
            }
          }
          if (transition.hasOwnProperty("valid")) {
            // TODO: check error block
            if (getFieldErrorsByFieldName(question.name, errors).length > 0) {
              return false;
            }
            return true;
          }
          return false;
        })
        .map((f) => f.question)
        .includes(question.name)
    );
  };

  export const getWarningQuestionsForParent = (
    questions: Question<QuestionFieldProperties>[],
    childQuestions: NextFieldTransition[] | undefined,
    currentValue: string | undefined,
    errors: ValidateError[]
  ): Question<WarningProperties>[] =>
    questions.filter(
      (question) =>
        question.type === SupportedFormField.Warning &&
        (childQuestions || [])
          .filter((transition) => {
            if (currentValue !== null && currentValue !== undefined) {
              if (transition.hasOwnProperty("equals")) {
                if (currentValue === transition.equals) {
                  return true;
                }
              }
              if (transition.hasOwnProperty("valid")) {
                // TODO: check error block
                if (
                  getFieldErrorsByFieldName(question.name, errors).length > 0
                ) {
                  return false;
                }
                return true;
              }
            }
            return false;
          })
          .map((f) => f.question)
          .includes(question.name)
    ) as Question<WarningProperties>[];

  export const getWarningsForField = (
    warnings: NextFieldTransition[] | undefined,
    currentValue: string | undefined
  ) => warnings?.filter(({ equals }) => equals === currentValue) || [];

  export const getRadioGroupOptionForQuestionByValue = (
    question: Question<QuestionFieldProperties>,
    currentValue: string
  ) => {
    if (question.type === SupportedFormField.RadioGroup) {
      return (question.properties as RadioGroupProperties).options
        .filter((entry) => entry.value === currentValue)
        .at(0);
    }
    return undefined;
  };

  export const getFieldErrorsByFieldName = (
    fieldName: string,
    errors: ValidateError[]
  ) => errors.filter((error) => error.field === fieldName);

  export const haveWarningsForQuestionBeenAcknowledged = (
    question: Question<QuestionFieldProperties>,
    currentValue: string | undefined,
    values: Record<string, string | undefined>,
    questions: Question<QuestionFieldProperties>[]
  ) => {
    let haveWarningsBeenAcknowledged = false;

    const warnings = getWarningQuestionsForParent(
      questions,
      question.warnings,
      currentValue,
      []
    );

    warnings.forEach((warning) => {
      if (values[warning.name] === "SELECTED") {
        haveWarningsBeenAcknowledged = true;
      }
    });
    return haveWarningsBeenAcknowledged;
  };

  export const canShowNextField = (
    question: Question<QuestionFieldProperties>,
    doesFieldHaveError: boolean,
    doesFieldHaveWarnings: boolean,
    areWarningsAcknowledged: boolean,
    isFieldTouched: boolean
  ) => {
    if (question.type === SupportedFormField.SectionBlock) {
      return true;
    }
    if (doesFieldHaveError) {
      return false;
    }

    if (doesFieldHaveWarnings) {
      if (!areWarningsAcknowledged) {
        return false;
      }
    }
    if (!isFieldTouched) {
      return false;
    }
    return true;
  };

  export const validate = async (
    questions: Question<QuestionFieldProperties>[],
    values: Record<string, string | undefined>
  ) => {
    const questionNames = Object.keys(values);

    const answeredQuestions = questions.filter((question) =>
      questionNames.includes(question.name)
    );

    const validationRules: Rules = {};

    answeredQuestions.forEach(
      (question) =>
        (validationRules[question.name] =
          (question.validation as Rule | undefined) ?? [])
    );

    const validator = new Schema(validationRules);
    const formErrors: ValidateError[] = [];
    const response = await validator
      .validate(values)
      .catch(
        ({
          errors,
          fields,
        }: {
          errors: ValidateError[] | null;
          fields: ValidateFieldsError;
        }) => {
          if (errors) {
            formErrors.push(...errors);
          }
          return new Error("Validation failed");
        }
      );
    if (response instanceof Error) {
      return formErrors;
    }
    return undefined;
  };

  export const transformAnswers = (
    answers: Record<string, string | undefined>
  ) =>
    Object.keys(answers)
      .map((k) => ({
        name: k,
        answer: answers[k],
      }))
      .filter(({ answer }) => !!answer);
}
