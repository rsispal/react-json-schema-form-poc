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

      if (transition.equals !== undefined) {
        if (Array.isArray(transition.equals)) {
          if (!transition.equals.includes(value!)) {
            return false;
          }
        } else if (transition.equals !== value) {
          return false;
        }
      }

      if (transition.valid !== undefined) {
        if (transition.valid && error) {
          return false;
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
            if (questionsToRender.findIndex((q) => q.id === nextQuestion.id)) {
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
              if (warningsToRender.findIndex((q) => q.id === warningQuestion.id)) {
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
                if (questionsToRender.findIndex((q) => q.id === nextQuestion.id)) {
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
