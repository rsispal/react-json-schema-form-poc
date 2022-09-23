/* Libraries */
import { Box, Flex, Text } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";

/* Components */
import { QuestionForm } from "../QuestionForm/formik";
import { QuestionFormUtilities } from "../QuestionForm/formik/QuestionForm.utilities";

import { ButtonGroupFieldWrapper } from "../QuestionForm/formik/field-wrappers/ButtonGroup";
import { LinkButtonFieldWrapper } from "../QuestionForm/formik/field-wrappers/LinkButton";
import { NextQuestionButtonFieldWrapper } from "../QuestionForm/formik/field-wrappers/NextQuestionButton";
import { PromptFieldWrapper } from "../QuestionForm/formik/field-wrappers/Prompt";
import { RadioGroupFieldWrapper } from "../QuestionForm/formik/field-wrappers/RadioGroup";
import { SubmitButtonFieldWrapper } from "../QuestionForm/formik/field-wrappers/SubmitButton";
import { TextInputFieldWrapper } from "../QuestionForm/formik/field-wrappers/TextInput";
import { WarningFieldWrapper } from "../QuestionForm/formik/field-wrappers/Warning";

/* Types */
import {
  RiskQuestionFormPayload,
  RiskQuestionFormProps,
} from "./RiskQuestionForm.types";
import { QuestionField } from "components/QuestionForm/formik/QuestionField";

export const RiskQuestionForm: FC<RiskQuestionFormProps> = ({
  schema,
  onSubmitCallback,
  onEndFormCallback,
}) => {
  const [values, setValues] = useState<Record<string, string | undefined>>({});

  const handleSubmit = (answers: Record<string, string | undefined>) => {
    const payload: RiskQuestionFormPayload = {
      source: "ONLINE",
      guided_question: schema.miscellaneous.guided_question,
      answers: QuestionFormUtilities.transformAnswers(answers),
    };
    console.log("[RiskQuestionForm] Submit", payload);
    onSubmitCallback(payload);
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
        onSubmitCallback={handleSubmit}
        onChangeCallback={handleFormChange}
        onEndFormClickCallback={handleEndFormClick}
        {...schema}
      >
        {({
          questionsToRender,
          values,
          errors,
          allQuestions,
          onEndFormClickCallback,
        }) =>
          questionsToRender.map((question, key) => (
            <QuestionField
              key={key}
              question={question}
              questions={allQuestions}
              renderQuestion={generateQuestionFieldCard}
              values={values}
              errors={errors}
              onEndFormClickCallback={onEndFormClickCallback}
              renderLinkButtonField={(props) => (
                <LinkButtonFieldWrapper {...props} />
              )}
              renderRadioGroupField={(props) => (
                <RadioGroupFieldWrapper {...props} />
              )}
              renderTextInputField={(props) => (
                <TextInputFieldWrapper {...props} />
              )}
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
            />
          ))
        }
      </QuestionForm>
    </Flex>
  );
};
