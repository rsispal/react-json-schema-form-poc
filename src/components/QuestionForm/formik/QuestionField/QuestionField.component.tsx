import { FC, Fragment, ReactElement } from "react";

/* Utilities */
import { QuestionFormUtilities } from "../QuestionForm.utilities";

/* Types */
import {
  ButtonGroupProperties,
  LinkButtonProperties,
  NextQuestionButtonProperties,
  PromptProperties,
  Question,
  QuestionFieldType,
  RadioGroupProperties,
  SubmitButtonProperties,
  SupportedFormField,
  TextInputProperties,
  WarningProperties,
} from "../QuestionForm.types";
import { QuestionFieldProps } from "./QuestionField.types";

export const QuestionField: FC<QuestionFieldProps> = ({
  questions,
  question,
  renderQuestion,
  values,
  errors,
  onEndFormClickCallback,
  renderLinkButtonField,
  renderRadioGroupField,
  renderTextInputField,
  renderNextQuestionButtonField,
  renderButtonGroupField,
  renderPromptField,
  renderWarningField,
  renderFieldErrorMessage,
  renderSubmitButtonField,
}) => {
  const getFieldValue = (fieldName: string) =>
    values[fieldName] ? values[fieldName] : undefined;

  const generateError = (fieldName: string) =>
    QuestionFormUtilities.getFieldErrorsByFieldName(fieldName, errors).map(
      (error, i) => (
        <Fragment key={i}>{renderFieldErrorMessage(error)}</Fragment>
      )
    );

  const generateWarnings = (question: Question<QuestionFieldType>) => {
    const currentValue = getFieldValue(question.name);

    const warnings = QuestionFormUtilities.getWarningQuestionsForParent(
      questions,
      question.warnings,
      currentValue,
      errors
    );

    return warnings.map((question, i) => (
      <Fragment key={i}>
        {renderWarningField({ question, onEndFormClickCallback })}
      </Fragment>
    ));
  };

  const generateField = (question: Question<QuestionFieldType>) => {
    const currentValue = getFieldValue(question.name);
    const doesFieldHaveError =
      QuestionFormUtilities.getFieldErrorsByFieldName(question.name, errors)
        .length > 0;
    const doesFieldHaveWarnings =
      QuestionFormUtilities.getWarningsForField(question.warnings, currentValue)
        .length > 0;

    const areWarningsAcknowledged =
      QuestionFormUtilities.haveWarningsForQuestionBeenAcknowledged(
        question,
        currentValue,
        values,
        questions
      );

    const canShowNextQuestion = QuestionFormUtilities.canShowNextField(
      doesFieldHaveError,
      doesFieldHaveWarnings,
      areWarningsAcknowledged
    );

    switch (question.type) {
      case SupportedFormField.LinkButton:
      case SupportedFormField.RadioGroup:
      case SupportedFormField.TextInput:
      case SupportedFormField.NextQuestionButton:
      case SupportedFormField.Prompt:
      case SupportedFormField.Warning:
      case SupportedFormField.SubmitButton: {
        return (
          <Fragment key={question.id}>
            {renderQuestion(
              <Fragment>
                {generateError(question.name)}

                {/* LINK BUTTON */}
                {question.type === SupportedFormField.LinkButton &&
                  renderLinkButtonField({
                    question: question as Question<LinkButtonProperties>,
                    onEndFormClickCallback,
                  })}

                {/* RADIO GROUP */}
                {question.type === SupportedFormField.RadioGroup &&
                  renderRadioGroupField({
                    question: question as Question<RadioGroupProperties>,
                    onEndFormClickCallback,
                  })}

                {/* TEXT INPUT */}
                {question.type === SupportedFormField.TextInput &&
                  renderTextInputField({
                    question: question as Question<TextInputProperties>,
                    onEndFormClickCallback,
                  })}

                {/* NEXT QUESTION BUTTON */}
                {question.type === SupportedFormField.NextQuestionButton &&
                  renderNextQuestionButtonField({
                    question:
                      question as Question<NextQuestionButtonProperties>,
                    onEndFormClickCallback,
                  })}

                {/* PROMPT */}
                {question.type === SupportedFormField.Prompt &&
                  renderPromptField({
                    question: question as Question<PromptProperties>,
                    onEndFormClickCallback,
                  })}

                {/* WARNING */}
                {question.type === SupportedFormField.Warning &&
                  renderWarningField({
                    question: question as Question<WarningProperties>,
                    onEndFormClickCallback,
                  })}

                {/* SUBMIT BUTTON */}
                {question.type === SupportedFormField.SubmitButton &&
                  renderSubmitButtonField({
                    question: question as Question<SubmitButtonProperties>,
                    onEndFormClickCallback,
                  })}

                {generateWarnings(question as Question<QuestionFieldType>)}
              </Fragment>
            )}
            {canShowNextQuestion && generateQuestion(undefined, question)}
          </Fragment>
        );
      }
      case SupportedFormField.ButtonGroup: {
        /*
        PROBLEM: Generating the buttons is fine, but how do I generate the next question if it has a transition?

        SPECIAL CASE:
        - Render a ButtonGroupWrapper (responsible for the actual buttons)
        - Map over each button entry and pass it to the recursive generateQuestion to load the next transition
        */
        return (
          <Fragment key={question.id}>
            {renderQuestion(
              <Fragment>
                {generateError(question.name)}
                {renderButtonGroupField({
                  question: question as Question<ButtonGroupProperties>,
                  onEndFormClickCallback,
                })}
                {generateWarnings(question as Question<QuestionFieldType>)}
              </Fragment>
            )}
            {/* Generate the next question following a button press */}
            {(question.properties as ButtonGroupProperties).buttons.map(
              (button) => {
                switch (button.type) {
                  case SupportedFormField.LinkButton:
                  case SupportedFormField.NextQuestionButton:
                  case SupportedFormField.SubmitButton: {
                    return (
                      <Fragment key={button.id}>
                        {generateQuestion(undefined, button)}
                      </Fragment>
                    );
                  }
                  default: {
                    return null;
                  }
                }
              }
            )}
          </Fragment>
        );
      }

      default: {
        return null;
      }
    }
  };

  const generateQuestion = (
    question: Question<QuestionFieldType> | undefined,
    subQuestion: Question<QuestionFieldType> | undefined
  ): ReactElement | null => {
    //  GENERATE MAIN FIELD
    if (question) {
      return generateField(question);
    }

    // GENERATE VALUE-BASED SUBFIELDS
    if (subQuestion) {
      const currentValue = getFieldValue(subQuestion.name);

      const childQuestions = QuestionFormUtilities.getChildQuestionsForParent(
        questions,
        subQuestion.next,
        currentValue,
        errors
      );
      return <Fragment>{childQuestions.map((q) => generateField(q))}</Fragment>;
    }
    return null;
  };

  return generateQuestion(question, undefined);
};
