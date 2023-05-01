import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import {
  NextQuestionButtonProperties,
  PreDefinedResponse,
  SchemaDrivenQuestionFieldWrapperProps,
} from "components/QuestionForm/formik-v2/types";
import { useField } from "formik";
import { FC } from "react";
import NextQuestionButton from "../../fields/NextQuestionButton";

export const NextQuestionButtonFieldWrapper: FC<SchemaDrivenQuestionFieldWrapperProps<NextQuestionButtonProperties>> = ({
  question,
}) => {
  const [, , helpers] = useField<string>({
    name: question.id,
  });

  const handleClick = () => helpers.setValue(PreDefinedResponse.SELECTED);

  return (
    <Stack>
      <Text data-testid={`${question.id}-question-prompt-text`} fontWeight={600} fontSize="larger">
        {question.prompt}
      </Text>
      {question.description && <DynamicText data={question.description} />}
      <NextQuestionButton
        {...question.properties}
        onClickCallback={handleClick}
        dataTestId={`${question.id}-next-question-button`}
      />
    </Stack>
  );
};
