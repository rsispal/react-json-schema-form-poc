/* Libraries */
import { Box, Flex, Text } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";

/* Components */
import { QuestionForm } from "../QuestionForm/rc-field-form";

import { ButtonGroupFieldWrapper } from "../QuestionForm/rc-field-form/field-wrappers/ButtonGroup";
import { LinkButtonFieldWrapper } from "../QuestionForm/rc-field-form/field-wrappers/LinkButton";
import { NextQuestionButtonFieldWrapper } from "../QuestionForm/rc-field-form/field-wrappers/NextQuestionButton";
import { PromptFieldWrapper } from "../QuestionForm/rc-field-form/field-wrappers/Prompt";
import { RadioGroupFieldWrapper } from "../QuestionForm/rc-field-form/field-wrappers/RadioGroup";
import { SubmitButtonFieldWrapper } from "../QuestionForm/rc-field-form/field-wrappers/SubmitButton";
import { TextInputFieldWrapper } from "../QuestionForm/rc-field-form/field-wrappers/TextInput";
import { WarningFieldWrapper } from "../QuestionForm/rc-field-form/field-wrappers/Warning";

/* Types */
import { RiskQuestionFormProps } from "./RiskQuestionForm.types";

export const RiskQuestionForm: FC<RiskQuestionFormProps> = ({
  schema,
  onSubmitCallback,
  onEndFormCallback,
}) => {
  const [values, setValues] = useState<Record<string, string | undefined>>({});

  const handleSubmit = (answers: Record<string, string | undefined>) => {
    console.log("[RiskQuestionForm] Submit", { answers });
    onSubmitCallback(answers);
  };
  const handleFormChange = (answers: Record<string, string | undefined>) =>
    setValues(answers);

  const handleEndFormClick = () => {
    console.log("[RiskQuestionForm] End", {});
    onEndFormCallback(values);
  };

  const handleSpecificCondition = (
    values: Record<string, string | undefined>
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
        renderLinkButtonField={(props) => <LinkButtonFieldWrapper {...props} />}
        renderRadioGroupField={(props) => <RadioGroupFieldWrapper {...props} />}
        renderTextInputField={(props) => <TextInputFieldWrapper {...props} />}
        renderNextQuestionButtonField={(props) => (
          <NextQuestionButtonFieldWrapper {...props} />
        )}
        renderButtonGroupField={(props) => (
          <ButtonGroupFieldWrapper {...props} />
        )}
        renderPromptField={(props) => <PromptFieldWrapper {...props} />}
        renderWarningField={(props) => <WarningFieldWrapper {...props} />}
        renderSubmitButtonField={(props) => (
          <SubmitButtonFieldWrapper {...props} />
        )}
        renderFieldErrorMessage={(error) => (
          <Text color="red">{error.message}</Text>
        )}
        {...schema}
      />
    </Flex>
  );
};
