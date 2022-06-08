import { FC, Fragment, ReactElement } from "react";
import { Stack, Text } from "@chakra-ui/react";

/* Field Wrappers */
import { ButtonGroupWrapper } from "../field-wrappers/ButtonGroup/ButtonGroup.wrapper";
import { LinkButtonWrapper } from "../field-wrappers/LinkButton/LinkButton.wrapper";
import { NextQuestionButtonWrapper } from "../field-wrappers/NextQuestionButton/NextQuestionButton.wrapper";
import { RadioGroupWrapper } from "../field-wrappers/RadioGroup/RadioGroup.wrapper";
import { TextInputWrapper } from "../field-wrappers/TextInput/TextInput.wrapper";
import { PromptWrapper } from "../field-wrappers/Prompt/Prompt.wrapper";
import { WarningWrapper } from "../field-wrappers/Warning/Warning.wrapper";
import { SubmitButtonWrapper } from "../field-wrappers/SubmitButton/SubmitButton.wrapper";

/* Utilities */
import { QuestionFormUtilities } from "../QuestionForm.utilities";

/* Types */
import {
  ButtonGroupProperties,
  Question,
  SupportedFormField,
} from "../QuestionForm.types";
import { QuestionFieldProps } from "./QuestionField.types";

export const QuestionField: FC<QuestionFieldProps> = ({
  questions,
  question,
  renderQuestion,
  values,
  errors,
  form,
  onEndFormClickCallback,
}) => {
  const getFieldValue = (fieldName: string) =>
    form.getFieldValue(fieldName) as string | undefined;

  const generateError = (fieldName: string) => (
    <>
      {QuestionFormUtilities.getFieldErrorsByFieldName(fieldName, errors).map(
        (error, i) => (
          <Text key={i} color="red">
            {error.message}
          </Text>
        )
      )}
    </>
  );

  const generateWarnings = (question: Question) => {
    const currentValue = getFieldValue(question.name);

    const warnings = QuestionFormUtilities.getWarningQuestionsForParent(
      questions,
      question.warnings,
      currentValue,
      errors
    );

    return (
      <Fragment>
        {warnings.map((q, i) => (
          <WarningWrapper
            key={i}
            question={q}
            onEndFormClickCallback={onEndFormClickCallback}
          />
        ))}
      </Fragment>
    );
  };

  const renderLinkButton = (question: Question) => (
    <Stack>
      <Text>{question.prompt}</Text>
      <LinkButtonWrapper question={question} />
    </Stack>
  );

  const renderRadioGroup = (question: Question) => (
    <Stack>
      <Text>{question.prompt}</Text>
      <RadioGroupWrapper question={question} />
    </Stack>
  );

  const renderTextInput = (question: Question) => (
    <Stack>
      <Text>{question.prompt}</Text>
      <TextInputWrapper question={question} />
    </Stack>
  );

  const renderNextQuestionButton = (question: Question) => (
    <Stack>
      <Text>{question.prompt}</Text>
      <NextQuestionButtonWrapper question={question} />
    </Stack>
  );

  const renderButtonGroup = (question: Question) => (
    <ButtonGroupWrapper question={question} />
  );

  const renderPrompt = (question: Question) => (
    <PromptWrapper
      question={question}
      onEndFormClickCallback={onEndFormClickCallback}
    />
  );

  const renderWarning = (question: Question) => (
    <WarningWrapper
      question={question}
      onEndFormClickCallback={onEndFormClickCallback}
    />
  );

  const renderSubmitButton = (question: Question) => (
    <Stack>
      <Text>{question.prompt}</Text>
      <SubmitButtonWrapper question={question} />
    </Stack>
  );

  const generateField = (question: Question, key?: number) => {
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
      case SupportedFormField.LinkButton: {
        return (
          <Fragment key={question.name}>
            {renderQuestion(
              <Fragment>
                {generateError(question.name)}
                {renderLinkButton(question)}
                {generateWarnings(question)}
              </Fragment>
            )}
            {canShowNextQuestion && generateQuestion(undefined, question)}
          </Fragment>
        );
      }
      case SupportedFormField.RadioGroup: {
        return (
          <Fragment key={question.name}>
            {renderQuestion(
              <Fragment>
                {generateError(question.name)}
                {renderRadioGroup(question)}
                {generateWarnings(question)}
              </Fragment>
            )}
            {canShowNextQuestion && generateQuestion(undefined, question)}
          </Fragment>
        );
      }
      case SupportedFormField.TextInput: {
        return (
          <Fragment key={question.name}>
            {renderQuestion(
              <Fragment>
                {generateError(question.name)}
                {renderTextInput(question)}
                {generateWarnings(question)}
              </Fragment>
            )}
            {canShowNextQuestion && generateQuestion(undefined, question)}
          </Fragment>
        );
      }
      case SupportedFormField.NextQuestionButton: {
        return (
          <Fragment key={question.name}>
            {renderQuestion(
              <Fragment>
                {generateError(question.name)}
                {renderNextQuestionButton(question)}
                {generateWarnings(question)}
              </Fragment>
            )}
            {canShowNextQuestion && generateQuestion(undefined, question)}
          </Fragment>
        );
      }
      case SupportedFormField.Prompt: {
        return (
          <Fragment key={question.name}>
            {renderQuestion(
              <Fragment>
                {generateError(question.name)}
                {renderPrompt(question)}
              </Fragment>
            )}
            {canShowNextQuestion && generateQuestion(undefined, question)}
          </Fragment>
        );
      }
      case SupportedFormField.Warning: {
        return (
          <Fragment key={question.name}>
            {renderQuestion(
              <Fragment>
                {generateError(question.name)}
                {renderWarning(question)}
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
          <Fragment key={question.name}>
            {renderQuestion(
              <Fragment>
                {generateError(question.name)}
                {renderButtonGroup(question)}
                {generateWarnings(question)}
              </Fragment>
            )}
            {(question.properties as ButtonGroupProperties).buttons.map(
              (button) => {
                switch (button.type) {
                  case SupportedFormField.LinkButton: {
                    return generateQuestion(undefined, button);
                  }
                  case SupportedFormField.NextQuestionButton: {
                    return generateQuestion(undefined, button);
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
      case SupportedFormField.SubmitButton: {
        /* 
        SPECIAL CASE:
        - Submit buttons cannot have any next question transitions

        */
        return (
          <Fragment key={question.name}>
            {renderQuestion(
              <Fragment>
                {generateError(question.name)}
                {renderSubmitButton(question)}
                {generateWarnings(question)}
              </Fragment>
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
    question: Question | undefined,
    subQuestion: Question | undefined
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
