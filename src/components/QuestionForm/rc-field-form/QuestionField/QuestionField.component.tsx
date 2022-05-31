import { FC, Fragment, ReactElement } from "react";
import { Alert, Stack, Text } from "@chakra-ui/react";

/* Field Wrappers */
import { ButtonGroupWrapper } from "../field-wrappers/ButtonGroup/ButtonGroup.wrapper";
import { LinkButtonWrapper } from "../field-wrappers/LinkButton/LinkButton.wrapper";
import { NextQuestionButtonWrapper } from "../field-wrappers/NextQuestionButton/NextQuestionButton.wrapper";
import { RadioGroupWrapper } from "../field-wrappers/RadioGroup/RadioGroup.wrapper";
import { TextInputWrapper } from "../field-wrappers/TextInput/TextInput.wrapper";

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
  form,
}) => {
  const getFieldValue = (fieldName: string) =>
    values[fieldName] as string | undefined; //form.getFieldState(fieldName)?.value as string | undefined;

  const getFieldError = (fieldName: string) => form.getFieldError(fieldName);

  const generateError = (fieldName: string) => {
    const errors = getFieldError(fieldName);
    return (
      <>
        {errors.map((error, i) => (
          <Text key={i} color="red">
            {error}
          </Text>
        ))}
      </>
    );
  };
  const generateWarnings = (question: Question) => {
    const currentValue = getFieldValue(question.name);
    const applicableWarnings = QuestionFormUtilities.getWarningsForField(
      question.warnings,
      currentValue
    );
    return (
      <>
        {applicableWarnings?.map(({ prompt }, i) => (
          <Alert key={i} status="warning">
            {prompt}
          </Alert>
        ))}
      </>
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

  const renderButtonGroup = (question: Question) => {
    return <ButtonGroupWrapper question={question} />;
  };

  const generateField = (question: Question, key?: number) => {
    const doesFieldHaveError = getFieldError(question.name).length > 0;

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
            {!doesFieldHaveError && generateQuestion(undefined, question)}
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
            {!doesFieldHaveError && generateQuestion(undefined, question)}
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
            {!doesFieldHaveError && generateQuestion(undefined, question)}
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
            {!doesFieldHaveError && generateQuestion(undefined, question)}
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
        currentValue
      );
      return <Fragment>{childQuestions.map((q) => generateField(q))}</Fragment>;
    }
    return null;
  };

  return generateQuestion(question, undefined);
};
