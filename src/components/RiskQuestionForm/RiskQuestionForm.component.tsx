/* Libraries */
import { Box, Flex } from "@chakra-ui/react";
import React, { FC, ReactElement } from "react";

/* Components */
import { QuestionForm } from "../QuestionForm/formik-v2";

/* Field Wrappers */
import LinkButtonFieldWrapper from "../fields/v2/field-wrappers/LinkButton";
import RadioGroupFieldWrapper from "../fields/v2/field-wrappers/RadioGroup";
import TextInputFieldWrapper from "../fields/v2/field-wrappers/TextInput";
import NextQuestionButtonFieldWrapper from "../fields/v2/field-wrappers/NextQuestionButton";
import ButtonGroupFieldWrapper from "../fields/v2/field-wrappers/ButtonGroup";
import PromptFieldWrapper from "../fields/v2/field-wrappers/Prompt";
import WarningFieldWrapper from "../fields/v2/field-wrappers/Warning";
import SubmitButtonFieldWrapper from "../fields/v2/field-wrappers/SubmitButton";
import SectionBlockFieldWrapper from "components/fields/v2/field-wrappers/SectionBlock";

/* Types */
import { QuestionFormProps } from "../QuestionForm/formik-v2/types";

import { RiskQuestionFormProps } from "./RiskQuestionForm.types";

const fields: QuestionFormProps["fields"] = {
  LinkButton: LinkButtonFieldWrapper,
  RadioGroup: RadioGroupFieldWrapper,
  TextInput: TextInputFieldWrapper,
  NextQuestionButton: NextQuestionButtonFieldWrapper,
  ButtonGroup: ButtonGroupFieldWrapper,
  Prompt: PromptFieldWrapper,
  Warning: WarningFieldWrapper,
  SubmitButton: SubmitButtonFieldWrapper,
  SectionBlock: SectionBlockFieldWrapper,
};

const QuestionFieldUI: FC<{ children: ReactElement | ReactElement[] }> = ({
  children,
}) => (
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

export const RiskQuestionForm: FC<RiskQuestionFormProps> = ({
  initialValues,
  schema,
  onSubmitCallback,
  onEndFormCallback,
}) => {
  return (
    <Flex flex={1} flexDir="column" alignItems="center">
      <QuestionForm
        fields={fields}
        questionFieldUI={QuestionFieldUI}
        initialValues={initialValues}
        onSubmitCallback={console.log}
        onEndFormCallback={console.log}
        {...schema}
        questions={schema.questions.map((q) => ({ ...q, ui: true }))}
      />
    </Flex>
  );
};
