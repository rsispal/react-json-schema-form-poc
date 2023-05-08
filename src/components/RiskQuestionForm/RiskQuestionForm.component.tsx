/* Libraries */
import { Box, Flex } from "@chakra-ui/react";
import React, { FC, ReactElement, useState } from "react";

/* Components */
import { SchemaDrivenQuestionForm } from "../QuestionForm/formik-v2";

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
import {
  Question,
  QuestionFieldProperties,
  SchemaDrivenQuestionFormProps,
  SchemaDrivenQuestionFormSubmission,
  SupportedFormField,
} from "../QuestionForm/formik-v2/types";

import { RiskQuestionFormProps } from "./RiskQuestionForm.types";

const fields: SchemaDrivenQuestionFormProps["fields"] = {
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

const QuestionFieldUI: FC<{ children: ReactElement | ReactElement[] }> = ({ children }) => (
  <Box bg="white" borderWidth="1px" borderRadius="lg" boxShadow="xl" padding={6} marginTop={6} marginBottom={6} width={800}>
    {children}
  </Box>
);

function useRiskQuestionAnalytics() {
  const [logged, setLogged] = useState<{ [k: string]: boolean }>({});

  const logtoAnalyticsOnce = (question: Question<QuestionFieldProperties>, value: string | undefined) => {
    if (question.type === SupportedFormField.RadioGroup && value === "NO" && !logged[question.id]) {
      console.log(`Logging ${question.id} to analytics`);
      setLogged({ ...logged, [question.id]: true });
    }
  };
  return { logtoAnalyticsOnce };
}

export const RiskQuestionForm: FC<RiskQuestionFormProps> = ({ initialValues, schema, onSubmitCallback, onEndFormCallback }) => {
  const { logtoAnalyticsOnce } = useRiskQuestionAnalytics();
  const handleSubmit = (values: SchemaDrivenQuestionFormSubmission) => {
    console.log("*** SUBMITTED ***", {
      source: "ONLINE",
      guided_question: schema.miscellaneous.guided_question,
      answers: Object.entries(values).map(([k, v]: [string, string | undefined]) => ({ name: k, answer: v })),
    });
    onSubmitCallback({
      source: "ONLINE",
      guided_question: schema.miscellaneous.guided_question,
      answers: Object.entries(values).map(([k, v]: [string, string | undefined]) => ({ name: k, answer: v })),
    });
  };

  const handleEndForm = () => {
    console.log("*** ENDED ***");
    onEndFormCallback();
  };

  return (
    <Flex flex={1} flexDir="column" alignItems="center">
      <Box borderRadius="lg" width={800}>
        <SchemaDrivenQuestionForm
          fields={fields}
          questionFieldUI={QuestionFieldUI}
          initialValues={initialValues}
          onSubmitCallback={handleSubmit}
          onEndFormCallback={handleEndForm}
          onAnswerCallback={logtoAnalyticsOnce}
          {...schema}
          questions={schema.questions}
        />
      </Box>
    </Flex>
  );
};
