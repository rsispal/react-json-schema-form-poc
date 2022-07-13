/* Libraries */
import { Box, Flex, Text } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";

/* Components */
import { QuestionForm } from "../QuestionForm/rc-field-form";

import { ButtonGroupWrapper } from "../QuestionForm/rc-field-form/field-wrappers/ButtonGroup/ButtonGroup.wrapper";
import { LinkButtonWrapper } from "../QuestionForm/rc-field-form/field-wrappers/LinkButton/LinkButton.wrapper";
import { NextQuestionButtonWrapper } from "../QuestionForm/rc-field-form/field-wrappers/NextQuestionButton/NextQuestionButton.wrapper";
import { PromptWrapper } from "../QuestionForm/rc-field-form/field-wrappers/Prompt/Prompt.wrapper";
import { RadioGroupWrapper } from "../QuestionForm/rc-field-form/field-wrappers/RadioGroup/RadioGroup.wrapper";
import { SubmitButtonWrapper } from "../QuestionForm/rc-field-form/field-wrappers/SubmitButton/SubmitButton.wrapper";
import { TextInputWrapper } from "../QuestionForm/rc-field-form/field-wrappers/TextInput/TextInput.wrapper";
import { WarningWrapper } from "../QuestionForm/rc-field-form/field-wrappers/Warning/Warning.wrapper";

/* Types */
import { RiskQuestionFormProps } from "./RiskQuestionForm.types";

export const RiskQuestionForm: FC<RiskQuestionFormProps> = ({
  schema,
  onSubmitCallback,
  onEndFormCallback,
}) => {
  const [values, setValues] = useState<
    Record<string, string | boolean | undefined>
  >({});

  const handleSubmit = (
    answers: Record<string, string | boolean | undefined>
  ) => {
    console.log("[RiskQuestionForm] Submit", { answers });
    onSubmitCallback(answers);
  };
  const handleFormChange = (
    answers: Record<string, string | boolean | undefined>
  ) => setValues(answers);

  const handleEndFormClick = () => {
    console.log("[RiskQuestionForm] End", {});
    onEndFormCallback(values);
  };

  const handleSpecificCondition = (
    values: Record<string, string | boolean | undefined>
  ) => {
    const isQ1AnsweredAsYes = values["Q1"] === "YES";
    const isQ1_1_YLinkClicked = values["Q1_1_Y"];
    if (isQ1AnsweredAsYes && isQ1_1_YLinkClicked) {
      console.log(
        "User has gone to pensionwise via link. Submitting form answers"
      );
      handleSubmit(values);
    }
  };

  useEffect(() => {
    handleSpecificCondition(values);
    // onChangeCallback && onChangeCallback(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const generateQuestionFieldCard = (children: ReactElement) => (
    <Box
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      padding={6}
      margin={6}
      width={800}
    >
      {children}
    </Box>
  );

  return (
    <Flex flex={1} flexDir="column" alignItems="center">
      <QuestionForm
        showAllQuestions={false}
        renderQuestion={generateQuestionFieldCard}
        onSubmitCallback={handleSubmit}
        onChangeCallback={handleFormChange}
        onEndFormClickCallback={handleEndFormClick}
        renderLinkButtonField={(props) => <LinkButtonWrapper {...props} />}
        renderRadioGroupField={(props) => <RadioGroupWrapper {...props} />}
        renderTextInputField={(props) => <TextInputWrapper {...props} />}
        renderNextQuestionButtonField={(props) => (
          <NextQuestionButtonWrapper {...props} />
        )}
        renderButtonGroupField={(props) => <ButtonGroupWrapper {...props} />}
        renderPromptField={(props) => <PromptWrapper {...props} />}
        renderWarningField={(props) => <WarningWrapper {...props} />}
        renderSubmitButtonField={(props) => <SubmitButtonWrapper {...props} />}
        renderFieldErrorMessage={(error) => (
          <Text color="red">{error.message}</Text>
        )}
        {...schema}
      />
    </Flex>
  );
};
