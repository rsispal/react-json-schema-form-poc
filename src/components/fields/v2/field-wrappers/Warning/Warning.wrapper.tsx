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
}) => {
  const [{ onChange }] = useField<string>({
    name: question.name,
  });

  const handleClick = () => onChange(question.name)(PreDefinedResponse.SELECTED);

  return (
    <Stack>
      <Text data-testid={`${question.name}-question-prompt-text`} fontWeight={600} fontSize="larger">
        {question.prompt}
      </Text>
      {question.description && <DynamicText data={question.description} />}
      <Warning
        onContinueClick={handleClick}
        onEndFormClick={onEndFormCallback}
        {...question.properties}
        dataTestId={`${question.name}-warning`}
      />
    </Stack>
  );
};
