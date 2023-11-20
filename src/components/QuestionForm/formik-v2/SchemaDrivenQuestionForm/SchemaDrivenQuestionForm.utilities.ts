import { FormikErrors } from "formik";
import {
  ButtonGroupProperties,
  NextFieldTransition,
  Question,
  QuestionFieldProperties,
  RadioGroupProperties,
  SchemaDrivenQuestionFormSubmission,
  SupportedFormField,
  WarningProperties,
} from "../types";

export namespace QuestionFormUtilities {
  const doesAnErrorExistForQuestion = (
    question: Question<QuestionFieldProperties>,
    errors: FormikErrors<SchemaDrivenQuestionFormSubmission>
  ) => !!errors.hasOwnProperty(question.id);

  const evaluateValidTrueTransition = (
    transition: NextFieldTransition,
    value: string | undefined,
    anyErrorsForThisField: boolean
  ): boolean => {
    return (transition.valid === true && value && !anyErrorsForThisField) || false;
  };

  const evaluateValidFalseTransition = (transition: NextFieldTransition, anyErrorsForThisField: boolean): boolean => {
    return (transition.valid === false && anyErrorsForThisField) || false;
  };

  const evaluateEqualsTransition = (
    transition: NextFieldTransition,
    value: string | undefined,
    anyErrorsForThisField: boolean
  ): boolean => {
    return (transition.equals === value && !anyErrorsForThisField) || false;
  };

  export const getNextChildWarningForField = (
    question: Question<QuestionFieldProperties>,
    questions: Question<QuestionFieldProperties>[],
    values: SchemaDrivenQuestionFormSubmission,
    errors: FormikErrors<SchemaDrivenQuestionFormSubmission>
  ) => {
    // Current Question "answer"
    const value = values[question.id];

    // Evaluate the transitions for this question, and find all that are true (assuming not already evaluated)
    const anyErrorsForThisField = doesAnErrorExistForQuestion(question, errors);

    const warnings: Question<WarningProperties>[] = [];

    //  Check for any unacknowledged warnings, then make them visible
    question.warnings?.forEach((transition) => {
      // Transition utilises valid condition
      if (transition.hasOwnProperty("valid")) {
        if (evaluateValidTrueTransition(transition, value, anyErrorsForThisField)) {
          // Transition expects valid value, value is present and no validation error
          const warning = questions.filter((q) => q.id === transition.question).at(0) as Question<WarningProperties> | undefined;
          warning && warnings.push(warning);
          return;
        }
        if (evaluateValidFalseTransition(transition, anyErrorsForThisField)) {
          // Transition expects invalid value and there _is_ a validation error
          const warning = questions.filter((q) => q.id === transition.question).at(0) as Question<WarningProperties> | undefined;
          warning && warnings.push(warning);
          return;
        }
      }

      // Transition utilises equals condition
      if (transition.hasOwnProperty("equals")) {
        if (evaluateEqualsTransition(transition, value, anyErrorsForThisField)) {
          const warning = questions.filter((q) => q.id === transition.question).at(0) as Question<WarningProperties> | undefined;
          warning && warnings.push(warning);
          return;
        }
      }
    });

    return warnings;
  };

  const questionArrayContains = (a: Question<QuestionFieldProperties>[], q: Question<QuestionFieldProperties>) =>
    a.findIndex((_q) => _q.id === q.id) > -1;

  // RECURSIVE METHOD
  export const getQuestionsToRender = (
    questions: Question<QuestionFieldProperties>[],
    values: SchemaDrivenQuestionFormSubmission,
    errors: FormikErrors<SchemaDrivenQuestionFormSubmission>
  ): Question<QuestionFieldProperties>[] => {
    const questionsToRender: Question<QuestionFieldProperties>[] = [];
    const warningsToRender: Question<QuestionFieldProperties>[] = [];

    questionsToRender.push(questions.at(0)!);

    const checkTransition = (transition: NextFieldTransition, questionId: string): boolean => {
      const value = values[questionId];
      const error = errors[questionId];

      // Transition: EQUALS:
      if (transition.equals !== undefined) {
        // array
        if (Array.isArray(transition.equals)) {
          // Array value - field value isn't present in array of expected values
          if (!transition.equals.includes(value!)) {
            return false;
          }
          // Single value - field doesn't equal required value
        } else if (transition.equals !== value) {
          return false;
        }
      }

      // Transition: VALID:
      if (transition.valid !== undefined) {
        // Valid = true transition, but field has error
        if (transition.valid && error) {
          return false;
          // Valid = false transition, but field has no error
        } else if (!transition.valid && !error) {
          return false;
        }
      }

      return true;
    };

    const findNextQuestion = (question: Question<QuestionFieldProperties>) => {
      // Handle next transitions
      question.next?.forEach((transition) => {
        if (checkTransition(transition, question.id)) {
          const nextQuestion = questions.find((q) => q.id === transition.question);
          if (nextQuestion) {
            if (!questionArrayContains(questionsToRender, nextQuestion)) {
              questionsToRender.push(nextQuestion);
              findNextQuestion(nextQuestion);
            }
          }
        }
      });

      // Handle warning transitions
      if (question.warnings) {
        question.warnings.forEach((transition) => {
          if (checkTransition(transition, question.id)) {
            const warningQuestion = questions.find((q) => q.id === transition.question);
            if (warningQuestion) {
              if (!questionArrayContains(warningsToRender, warningQuestion)) {
                warningsToRender.push(warningQuestion);
                findNextQuestion(warningQuestion);
              }
            }
          }
        });
      }

      // Handle next transitions for ButtonGroup Question type (these contain child Question entries for each button)
      if (question.type === SupportedFormField.ButtonGroup) {
        (question as Question<ButtonGroupProperties>).properties.buttons.forEach((buttonQuestion) => {
          buttonQuestion.next!.forEach((transition) => {
            if (checkTransition(transition, buttonQuestion.id)) {
              const nextQuestion = questions.find((q) => q.id === transition.question);
              if (nextQuestion) {
                if (!questionArrayContains(questionsToRender, nextQuestion)) {
                  questionsToRender.push(nextQuestion);
                  findNextQuestion(nextQuestion);
                }
              }
            }
          });
        });
      }
    };

    findNextQuestion(questionsToRender[0]);
    return questionsToRender;
  };

  // BACKOFFICE METHODS
  export const getRadioGroupOptionForQuestionByValue = (question: Question<QuestionFieldProperties>, currentValue: string) => {
    if (question.type === SupportedFormField.RadioGroup) {
      return (question.properties as RadioGroupProperties).options.filter((entry) => entry.value === currentValue).at(0);
    }
    return undefined;
  };

  export const getQuestionById = (questions: Question<QuestionFieldProperties>[], id: string) =>
    questions.filter((q) => q.id === id).at(0);
}
