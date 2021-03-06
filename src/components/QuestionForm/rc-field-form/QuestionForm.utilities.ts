import Schema, {
  Rule,
  Rules,
  ValidateError,
  ValidateFieldsError,
} from "async-validator";
import {
  NextFieldTransition,
  Question,
  QuestionFieldType,
  RadioGroupProperties,
  SupportedFormField,
  WarningProperties,
} from "./QuestionForm.types";

export namespace QuestionFormUtilities {
  /**
   * @function getFirstQuestion - get the first question from an array of questions
   * @param questions {Question[]} - array of questions
   * @returns Question | undefined
   */
  export const getFirstQuestion = (questions: Question<QuestionFieldType>[]) =>
    questions.at(0);

  /**
   * @function getLastQuestion - get the last question from an array of questions
   * @param questions {Question[]} - array of questions
   * @returns Question | undefined
   */
  export const getLastQuestion = (questions: Question<QuestionFieldType>[]) =>
    questions.at(questions.length - 1);

  /**
   * @function getAllParentQuestions - get non-child questions from an array of questions
   * @param questions {Question[]} - array of questions
   * @returns Question[]
   */
  export const getAllParentQuestions = (
    questions: Question<QuestionFieldType>[]
  ) => questions.filter(({ exclude }) => exclude === false);

  /**
   * @function getQuestionByName - get a question by the name attribute within the field object
   * @param questions {Question[]} - array of questions
   * @param name {string} - field name
   * @returns Question | undefined
   */
  export const getQuestionByName = (
    questions: Question<QuestionFieldType>[],
    name: string
  ) => questions.filter((q) => q.name === name).at(0);

  /**
   * @function getChildQuestionsForParent - get any applicable warnings based on a provided "current" value
   * @param questions {Question[]} - array of questions
   * @param transitions {NextFieldTransition[] | undefined} - array of transitions to another question
   * @param currentValue {string | undefined} - current value to compare against
   * @param errors  {ValidateError[]} - async validator errors
   * @returns Question[]
   */
  export const getChildQuestionsForParent = (
    questions: Question<QuestionFieldType>[],
    transitions: NextFieldTransition[] | undefined,
    currentValue: string | undefined,
    errors: ValidateError[]
  ) =>
    questions.filter((question) =>
      (transitions || [])
        .filter((transition) => {
          if (currentValue !== null && currentValue !== undefined) {
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
          }
          return false;
        })
        .map((f) => f.question)
        .includes(question.name)
    );

  /**
   * @function getWarningQuestionsForParent - get any applicable warnings question objects based on a provided "current" value
   * @param questions {Question[]} - array of questions
   * @param transitions {NextFieldTransition[] | undefined} - array of transitions to another question
   * @param currentValue {string | undefined} - current value to compare against
   * @param errors  {ValidateError[]} - async validator errors
   * @returns Question[]
   */
  export const getWarningQuestionsForParent = (
    questions: Question<QuestionFieldType>[],
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

  /**
   * @function getWarningsForField - get any applicable warnings based on a provided "current" value
   * @param warnings {WarningProperties[] | undefined} - warnings array
   * @param currentValue {string | undefined} - current value to compare against
   * @returns NextFieldTransition[]
   */
  export const getWarningsForField = (
    warnings: NextFieldTransition[] | undefined,
    currentValue: string | undefined
  ) => warnings?.filter(({ equals }) => equals === currentValue) || [];

  /**
   * @function getRadioGroupOptionForQuestionByValue - get the radio option corresponding to a specific value
   * @param question  {Question} - question with RadioGroup field
   * @param currentValue {string | undefined} - specific value to lookup with
   * @returns RadioOption | undefined
   */
  export const getRadioGroupOptionForQuestionByValue = (
    question: Question<QuestionFieldType>,
    currentValue: string
  ) => {
    if (question.type === SupportedFormField.RadioGroup) {
      return (question.properties as RadioGroupProperties).options
        .filter((entry) => entry.value === currentValue)
        .at(0);
    }
    return undefined;
  };

  /**
   * @function getFieldErrorsByFieldName - get applicable errors for a specific field from Async Validator error response
   * @param fieldName {string} - field name
   * @param errors  {ValidateError[]} - async validator errors
   * @returns ValidateError[]
   */
  export const getFieldErrorsByFieldName = (
    fieldName: string,
    errors: ValidateError[]
  ) => errors.filter((error) => error.field === fieldName);

  /**
   * @function haveWarningsForQuestionBeenAcknowledged - determine whether warnings for a specific question have been answered
   * @param question  {Question} - question field
   * @param currentValue {string | undefined} - specific value to lookup with
   * @param values  {Record<string, string | boolean | undefined>} - current form values
   * @param questions {Question[]} - array of questions
   * @returns boolean
   */
  export const haveWarningsForQuestionBeenAcknowledged = (
    question: Question<QuestionFieldType>,
    currentValue: string | undefined,
    values: Record<string, string | boolean | undefined>,
    questions: Question<QuestionFieldType>[]
  ) => {
    let haveWarningsBeenAcknowledged = false;

    const warnings = getWarningQuestionsForParent(
      questions,
      question.warnings,
      currentValue,
      []
    );

    warnings.forEach((warning) => {
      if (values[warning.name] === true) {
        haveWarningsBeenAcknowledged = true;
      }
    });
    return haveWarningsBeenAcknowledged;
  };

  /**
   * @function canShowNextField - determine whether the next field can be shown based on whether the field has any errors or unacknowledged warnings
   * @param doesFieldHaveError {boolean} - true if the field has any errors
   * @param doesFieldHaveWarnings {boolean} - true if the field has any warnings
   * @param areWarningsAcknowledged {boolean} - true if any warning has been acknowledged
   * @returns boolean - true if the next field can be shown
   */
  export const canShowNextField = (
    doesFieldHaveError: boolean,
    doesFieldHaveWarnings: boolean,
    areWarningsAcknowledged: boolean
  ) => {
    if (doesFieldHaveError) {
      return false;
    }

    if (doesFieldHaveWarnings) {
      if (!areWarningsAcknowledged) {
        return false;
      }
    }
    return true;
  };

  /**
   * @function validate - run Async validator on the current answer set to ensure it complies with the validation rules defined in the schema
   * @param values  {Record<string, string | boolean | undefined>} - current form values
   * @param questions {Question[]} - array of questions
   * @returns Promise: ValidateError[] (validation error),  undefined (validation success)
   */
  export const validate = async (
    questions: Question<QuestionFieldType>[],
    values: Record<string, string | boolean | undefined>
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
}
