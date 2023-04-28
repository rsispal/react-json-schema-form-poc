import { FormikErrors } from "formik";
import {
  ButtonGroupProperties,
  NextFieldTransition,
  Question,
  QuestionFieldProperties,
  QuestionFormSubmission,
  SupportedFormField,
  WarningProperties,
} from "../types";

export namespace QuestionFormUtilities {
  const loggingEnabled = false;
  const log = loggingEnabled ? console.log : function () {};

  const doesAnErrorExistForQuestion = (
    question: Question<QuestionFieldProperties>,
    errors: FormikErrors<QuestionFormSubmission>
  ) => !!errors.hasOwnProperty(question.name);

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

  const isQuestionOfType = (actual: SupportedFormField, expected: SupportedFormField) => actual === expected;

  const isVisited = (visited: Record<string, boolean>, key: string) => visited[key] && visited[key] === true;

  const markVisited = (values: Record<string, boolean>, key: string) => ({ ...values, [key]: true });

  const getChildWarnings = (questions: Question<QuestionFieldProperties>[]) => {
    return questions
      .filter((q) => q.type !== SupportedFormField.Warning)
      .flatMap((q) => q.warnings?.map((w) => w.question) ?? []);
  };

  export const getNextChildWarningForField = (
    question: Question<QuestionFieldProperties>,
    questions: Question<QuestionFieldProperties>[],
    values: QuestionFormSubmission,
    errors: FormikErrors<QuestionFormSubmission>
  ) => {
    // Current Question "answer"
    const value = values[question.name];

    // Evaluate the transitions for this question, and find all that are true (assuming not already evaluated)
    const anyErrorsForThisField = doesAnErrorExistForQuestion(question, errors);

    const warnings: Question<WarningProperties>[] = [];

    //  Check for any unacknowledged warnings, then make them visible
    question.warnings?.forEach((transition) => {
      // Transition utilises valid condition

      if (transition.hasOwnProperty("valid")) {
        if (evaluateValidTrueTransition(transition, value, anyErrorsForThisField)) {
          log(`\t[TRANSITION ${question.name} -> ${transition.question}]: VALID=YES`, value && !anyErrorsForThisField);
          // Transition expects valid value, value is present and no validation error
          const warning = questions.filter((q) => q.id === transition.question).at(0) as Question<WarningProperties> | undefined;
          warning && warnings.push(warning);
          return;
        }
        if (evaluateValidFalseTransition(transition, anyErrorsForThisField)) {
          log(`\t[TRANSITION ${question.name} -> ${transition.question}]: VALID=NO`, anyErrorsForThisField);
          // Transition expects invalid value and there _is_ a validation error
          const warning = questions.filter((q) => q.id === transition.question).at(0) as Question<WarningProperties> | undefined;
          warning && warnings.push(warning);
          return;
        }
      }

      // Transition utilises equals condition
      if (transition.hasOwnProperty("equals")) {
        log(
          `\t[TRANSITION ${question.name} -> ${transition.question}]: EQUALS: "${transition.equals}" (value: "${value}")`,
          value === transition.equals
        );
        if (evaluateEqualsTransition(transition, value, anyErrorsForThisField)) {
          const warning = questions.filter((q) => q.id === transition.question).at(0) as Question<WarningProperties> | undefined;
          warning && warnings.push(warning);
          return;
        }
      }
    });

    return warnings;
  };

  export const getQuestions = (
    questions: Question<QuestionFieldProperties>[],
    values: QuestionFormSubmission,
    errors: FormikErrors<QuestionFormSubmission>
  ): Record<string, boolean> => {
    let questionState: Record<string, boolean> = {};

    log("STATE CHANGE", { values, errors });

    const childWarnings = getChildWarnings(questions);

    questions.forEach((question, position, all) => {
      log(`[QUESTION ${question.name}] ${question.type}`);

      const previousQuestion = all[position - 1] ?? undefined;
      const nextQuestion = all.at(position + 1) ?? undefined;

      const isFirstQuestion = position < 1 && !!question && !previousQuestion && !!nextQuestion;

      // Render firstmost element
      if (isFirstQuestion && isQuestionOfType(question.type, SupportedFormField.SectionBlock)) {
        questionState = markVisited(questionState, question.name);
        return true;
      }
      // Render the next field after the first SectionBlock
      if (isQuestionOfType(previousQuestion.type, SupportedFormField.SectionBlock) && position === 1) {
        questionState = markVisited(questionState, question.name);
      }

      if (
        isQuestionOfType(question.type, SupportedFormField.SectionBlock) &&
        isVisited(questionState, question.name) &&
        nextQuestion
      ) {
        questionState = markVisited(questionState, nextQuestion.name);
      }

      // Current Question "answer"
      const value = values[question.name];

      // Evaluate the transitions for this question, and find all that are true (assuming not already evaluated)
      const anyErrorsForThisField = doesAnErrorExistForQuestion(question, errors);

      //  Check for any unacknowledged warnings, then make them visible
      let questionHasUnacknowledgedWarning = false;

      question.warnings?.forEach((transition) => {
        // Transition utilises valid condition

        if (transition.hasOwnProperty("valid")) {
          if (evaluateValidTrueTransition(transition, value, anyErrorsForThisField)) {
            // Transition expects valid value, value is present and no validation error
            log(`\t[TRANSITION ${question.name} -> ${transition.question}]: VALID=YES`, value && !anyErrorsForThisField);
            questionState = markVisited(questionState, transition.question);
            if (!questionHasUnacknowledgedWarning && !values[transition.question]) {
              questionHasUnacknowledgedWarning = true;
            }
            return;
          }
          if (evaluateValidFalseTransition(transition, anyErrorsForThisField)) {
            log(`\t[TRANSITION ${question.name} -> ${transition.question}]: VALID=NO`, anyErrorsForThisField);
            // Transition expects invalid value and there _is_ a validation error
            questionState = markVisited(questionState, transition.question);
            if (!questionHasUnacknowledgedWarning && !values[transition.question]) {
              questionHasUnacknowledgedWarning = true;
            }
            return;
          }
        }

        // Transition utilises equals condition
        if (transition.hasOwnProperty("equals")) {
          log(
            `\t[TRANSITION ${question.name} -> ${transition.question}]: EQUALS: "${transition.equals}" (value: "${value}")`,
            value === transition.equals
          );
          if (evaluateEqualsTransition(transition, value, anyErrorsForThisField)) {
            questionState = markVisited(questionState, transition.question);
            if (!questionHasUnacknowledgedWarning && !values[transition.question]) {
              questionHasUnacknowledgedWarning = true;
            }
            return;
          }
        }
      });

      log(`\tQuestion has any unacknowledged warning?:${questionHasUnacknowledgedWarning ? "YES" : "NO"}`);

      !questionHasUnacknowledgedWarning &&
        question.next?.forEach((transition) => {
          // Transition utilises valid condition
          if (transition.hasOwnProperty("valid")) {
            if (evaluateValidTrueTransition(transition, value, anyErrorsForThisField)) {
              // Transition expects valid value, value is present and no validation error
              log(`\t[TRANSITION ${question.name} -> ${transition.question}]: VALID=YES`, value && !anyErrorsForThisField);
              questionState = markVisited(questionState, transition.question);
              return;
            }
            if (evaluateValidFalseTransition(transition, anyErrorsForThisField)) {
              log(`\t[TRANSITION ${question.name} -> ${transition.question}]: VALID=NO`, anyErrorsForThisField);
              // Transition expects invalid value and there _is_ a validation error
              questionState = markVisited(questionState, transition.question);
              return;
            }
          }

          // Transition utilises equals condition
          if (transition.hasOwnProperty("equals")) {
            log(
              `\t[TRANSITION ${question.name} -> ${transition.question}]: EQUALS: "${transition.equals}" (value: "${value}")`,
              value === transition.equals
            );
            if (evaluateEqualsTransition(transition, value, anyErrorsForThisField)) {
              questionState = markVisited(questionState, transition.question);
              return;
            }
          }
        });

      // Evaluate button group
      if (question.type === SupportedFormField.ButtonGroup) {
        (question.properties as ButtonGroupProperties).buttons.forEach((b) => {
          b.next?.forEach((transition) => {
            log(`\t[BUTTON GROUP: ${question.name}] Evaluating ${b.name} > [${b.name} -> ${transition.question}] `, values);

            const value = values[b.name];
            const anyErrorsForThisField = doesAnErrorExistForQuestion(b, errors);

            // Transition utilises valid condition
            if (transition.hasOwnProperty("valid")) {
              if (evaluateValidTrueTransition(transition, value, anyErrorsForThisField)) {
                // Transition expects valid value, value is present and no validation error
                log(`\t[TRANSITION ${b.name} -> ${transition.question}]: VALID=YES`, value && !anyErrorsForThisField);
                questionState = markVisited(questionState, transition.question);
                return;
              }
              if (evaluateValidFalseTransition(transition, anyErrorsForThisField)) {
                log(`\t[TRANSITION ${b.name} -> ${transition.question}]: VALID=NO`, anyErrorsForThisField);
                // Transition expects invalid value and there _is_ a validation error
                questionState = markVisited(questionState, transition.question);
                return;
              }
            }

            // Transition utilises equals condition
            if (transition.hasOwnProperty("equals")) {
              log(
                `\t[TRANSITION ${b.name} -> ${transition.question}]: EQUALS: "${transition.equals}" (value: "${value}")`,
                value === transition.equals
              );
              if (evaluateEqualsTransition(transition, value, anyErrorsForThisField)) {
                questionState = markVisited(questionState, transition.question);
                return;
              }
            }
          });
        });
      }
    });

    const response: Record<string, boolean> = {};

    for (const [k, v] of Object.entries(questionState)) {
      if (!childWarnings.includes(k)) {
        response[k] = v;
      }
    }

    return response;
  };
}
