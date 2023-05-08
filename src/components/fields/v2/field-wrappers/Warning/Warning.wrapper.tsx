import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import {
  WarningProperties,
  SchemaDrivenQuestionFieldWrapperProps,
  PreDefinedResponse,
} from "components/QuestionForm/formik-v2/types";
import { useField } from "formik";
import { FC } from "react";
import Warning from "../../fields/Warning";

export const WarningFieldWrapper: FC<SchemaDrivenQuestionFieldWrapperProps<WarningProperties>> = ({
  question,
  onEndFormCallback,
  onAnswerCallback,
}) => {
  const [{ onChange }] = useField<string>({
    name: question.id,
  });

  const handleClick = () => {
    onAnswerCallback(question, PreDefinedResponse.SELECTED);
    onChange(question.id)(PreDefinedResponse.SELECTED);
  };

  return (
    <Stack>
      <Text data-testid={`${question.id}-question-prompt-text`} fontWeight={600} fontSize="larger">
        {question.prompt}
      </Text>
      {question.description && <DynamicText data={question.description} />}
      <Warning
        onContinueClick={handleClick}
        onEndFormClick={onEndFormCallback}
        {...question.properties}
        dataTestId={`${question.id}-warning`}
      />
    </Stack>
  );
};
