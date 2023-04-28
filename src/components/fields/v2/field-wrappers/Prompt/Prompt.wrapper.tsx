import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import { PreDefinedResponse, PromptProperties, QuestionFieldWrapperProps } from "components/QuestionForm/formik-v2/types";
import { useField } from "formik";
import { FC } from "react";
import Prompt from "../../fields/Prompt";

export const PromptFieldWrapper: FC<QuestionFieldWrapperProps<PromptProperties>> = ({ question, onEndFormCallback }) => {
  const [{ value, onChange }] = useField<string>({
    name: question.name,
  });

  const handleClick = () => onChange(question.name)(PreDefinedResponse.SELECTED);

  return (
    <Stack>
      <Text data-testid={`${question.name}-question-prompt-text`} fontWeight={600} fontSize="larger">
        {question.prompt}
      </Text>
      {question.description && <DynamicText data={question.description} />}
      <Prompt
        onContinueClick={handleClick}
        onEndFormClick={onEndFormCallback}
        {...question.properties}
        dataTestId={`${question.name}-prompt`}
        isAcknowledged={value === PreDefinedResponse.SELECTED}
      />
    </Stack>
  );
};
