import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import { SubmitButtonProperties, SchemaDrivenQuestionFieldWrapperProps } from "components/QuestionForm/formik-v2/types";
import { FC } from "react";
import SubmitButton from "../../fields/SubmitButton";

export const SubmitButtonFieldWrapper: FC<SchemaDrivenQuestionFieldWrapperProps<SubmitButtonProperties>> = ({ question }) => {
  return (
    <Stack>
      <Text data-testid={`${question.id}-question-prompt-text`} fontWeight={600} fontSize="larger">
        {question.prompt}
      </Text>
      {question.description && <DynamicText data={question.description} />}
      <SubmitButton {...question.properties} dataTestId={`${question.id}-submit-button`} />
    </Stack>
  );
};
