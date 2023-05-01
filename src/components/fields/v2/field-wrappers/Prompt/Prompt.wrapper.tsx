import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import {
  PreDefinedResponse,
  PromptProperties,
  SchemaDrivenQuestionFieldWrapperProps,
} from "components/QuestionForm/formik-v2/types";
import { useField } from "formik";
import { FC } from "react";
import Prompt from "../../fields/Prompt";

export const PromptFieldWrapper: FC<SchemaDrivenQuestionFieldWrapperProps<PromptProperties>> = ({
  question,
  onEndFormCallback,
}) => {
  const [{ value, onChange }] = useField<string>({
    name: question.id,
  });

  const handleClick = () => onChange(question.id)(PreDefinedResponse.SELECTED);

  return (
    <Stack>
      <Text data-testid={`${question.id}-question-prompt-text`} fontWeight={600} fontSize="larger">
        {question.prompt}
      </Text>
      {question.description && <DynamicText data={question.description} />}
      <Prompt
        onContinueClick={handleClick}
        onEndFormClick={onEndFormCallback}
        {...question.properties}
        dataTestId={`${question.id}-prompt`}
        isAcknowledged={value === PreDefinedResponse.SELECTED}
      />
    </Stack>
  );
};
