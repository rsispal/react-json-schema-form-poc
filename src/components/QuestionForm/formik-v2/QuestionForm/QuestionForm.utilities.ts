import Schema, {
  Rule,
  Rules,
  ValidateError,
  ValidateFieldsError,
} from "async-validator";
import { FormikErrors } from "formik";
import {
  ButtonGroupProperties,
  Question,
  QuestionFieldProperties,
  QuestionFormSubmission,
  SupportedFormField,
} from "../types";

export namespace QuestionFormUtilities {
  const doesAnErrorExistForQuestion = (
    question: Question<QuestionFieldProperties>,
    errors: FormikErrors<QuestionFormSubmission>
  ) => !!errors.hasOwnProperty(question.name);

  export const shouldRenderThisQuestion = (
    position: number,
    question: Question<QuestionFieldProperties>,
    previousQuestion: Question<QuestionFieldProperties> | undefined,
    nextQuestion: Question<QuestionFieldProperties> | undefined,
    values: QuestionFormSubmission,
    errors: FormikErrors<QuestionFormSubmission>
  ): boolean => {
    const isFirstQuestion =
      position < 1 && !!question && !previousQuestion && !!nextQuestion;

    // Render firstmost element
    if (isFirstQuestion && question.type === SupportedFormField.SectionBlock) {
      return true;
    }
    // Render the next field after the first SectionBlock
    if (
      previousQuestion?.type === SupportedFormField.SectionBlock &&
      position === 1
    ) {
      return true;
    }

    // Evaluate if the transitions have been met for the previous question
    // return evaluateTransitionsForPreviousQuestion(
    //   question,
    //   previousQuestion,
    //   values,
    //   errors
    // );
    return false;
  };

  const mutate = (
    values: Record<string, boolean>,
    key: string,
    newValue: boolean
  ) => {
    return { ...values, [key]: newValue };
  };

  const shouldLogToConsole = false;
  const log = shouldLogToConsole ? console.log : function () {};

  // evaluate valid=true transition :: transition, value, anyErrorsForThisField
  // evaluate valid=false transition :: transition, value, anyErrorsForThisField
  // evaluate equals transition :: transition, value, anyErrorsForThisField

  export const getQuestions = (
    questions: Question<QuestionFieldProperties>[],
    values: QuestionFormSubmission,
    errors: FormikErrors<QuestionFormSubmission>
  ) => {
    let response: Record<string, boolean> = {};

    log("STATE CHANGE", { values, errors });

    questions.map((question, position, all) => {
      log(`[QUESTION ${question.name}] ${question.type}`);
      const previousQuestion = all[position - 1] ?? undefined;
      const nextQuestion = all.at(position + 1) ?? undefined;

      const isFirstQuestion =
        position < 1 && !!question && !previousQuestion && !!nextQuestion;

      // Render firstmost element
      if (
        isFirstQuestion &&
        question.type === SupportedFormField.SectionBlock
      ) {
        response = mutate(response, question.name, true);
        return true;
      }
      // Render the next field after the first SectionBlock
      if (
        previousQuestion?.type === SupportedFormField.SectionBlock &&
        position === 1
      ) {
        response = mutate(response, question.name, true);
      }

      if (
        question.type === SupportedFormField.SectionBlock &&
        response.hasOwnProperty(question.name) &&
        response[question.name] === true &&
        nextQuestion
      ) {
        response = mutate(response, nextQuestion.name, true);
      }

      // Evaluate button group
      if (question.type === SupportedFormField.ButtonGroup) {
        (question.properties as ButtonGroupProperties).buttons.forEach((b) => {
          b.next?.forEach((transition) => {
            log(
              `\t[BUTTON GROUP: ${question.name}] Evaluating ${b.name} > [${b.name} -> ${transition.question}] `,
              values
            );

            const value = values[b.name];
            const anyErrorsForThisField = doesAnErrorExistForQuestion(
              b,
              errors
            );

            // Transition utilises valid condition
            if (transition.hasOwnProperty("valid")) {
              if (
                transition.valid === true &&
                value &&
                !anyErrorsForThisField
              ) {
                // Transition expects valid value, value is present and no validation error
                log(
                  `\t[TRANSITION ${b.name} -> ${transition.question}]: VALID=YES`,
                  value && !anyErrorsForThisField
                );
                response = mutate(response, transition.question, true);
                return;
              }
              if (transition.valid === false && anyErrorsForThisField) {
                log(
                  `\t[TRANSITION ${b.name} -> ${transition.question}]: VALID=NO`,
                  anyErrorsForThisField
                );
                // Transition expects invalid value and there _is_ a validation error
                response = mutate(response, transition.question, true);
                return;
              }
            }

            // Transition utilises equals condition
            if (transition.hasOwnProperty("equals")) {
              log(
                `\t[TRANSITION ${b.name} -> ${transition.question}]: EQUALS: "${transition.equals}" (value: "${value}")`,
                value === transition.equals
              );
              if (transition.equals === value && !anyErrorsForThisField) {
                response = mutate(response, transition.question, true);
                return;
              }
            }

            // If it's previously been made visible, then do not change this
            if (!response[transition.question]) {
              response = mutate(response, transition.question, false);
            }
          });
        });
      }

      // Evaluate the transitions for this question, and find all that are true (assuming not already evaluated)
      const value = values[question.name];
      const anyErrorsForThisField = doesAnErrorExistForQuestion(
        question,
        errors
      );
      const { next } = question;

      next?.forEach((transition) => {
        // Transition utilises valid condition
        if (transition.hasOwnProperty("valid")) {
          if (transition.valid === true && value && !anyErrorsForThisField) {
            // Transition expects valid value, value is present and no validation error
            log(
              `\t[TRANSITION ${question.name} -> ${transition.question}]: VALID=YES`,
              value && !anyErrorsForThisField
            );
            response = mutate(response, transition.question, true);
            return;
          }
          if (transition.valid === false && anyErrorsForThisField) {
            log(
              `\t[TRANSITION ${question.name} -> ${transition.question}]: VALID=NO`,
              anyErrorsForThisField
            );
            // Transition expects invalid value and there _is_ a validation error
            response = mutate(response, transition.question, true);
            return;
          }
        }

        // Transition utilises equals condition
        if (transition.hasOwnProperty("equals")) {
          log(
            `\t[TRANSITION ${question.name} -> ${transition.question}]: EQUALS: "${transition.equals}" (value: "${value}")`,
            value === transition.equals
          );
          if (transition.equals === value && !anyErrorsForThisField) {
            response = mutate(response, transition.question, true);
            return;
          }
        }

        // If it's previously been made visible, then do not change this
        if (!response[transition.question]) {
          response = mutate(response, transition.question, false);
        }
      });

      return false;
    });

    log({ questionsToRender: response, values, errors });
    log("\n\n\n");

    return response;
  };
}
