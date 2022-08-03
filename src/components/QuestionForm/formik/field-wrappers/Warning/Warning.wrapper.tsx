import { FC } from "react";
import { useField } from "formik";
import { Warning } from "../../../../fields/Warning";
import { QuestionFieldRenderProps } from "../../QuestionField/QuestionField.types";
import { WarningProperties } from "../../QuestionForm.types";
import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";

export const WarningFieldWrapper: FC<
  QuestionFieldRenderProps<WarningProperties>
> = ({ question, onEndFormClickCallback }) => {
  const [{ onChange }] = useField<string>({
    name: question.name,
  });

  const handleClick = () => onChange(question.name)("SELECTED");

  return (
    <Stack>
      <Text
        data-testid={`${question.name}-question-prompt-text`}
        fontWeight={600}
        fontSize="larger"
      >
        {question.prompt}
      </Text>
      {question.description && <DynamicText data={question.description} />}
      <Warning
        onContinueClick={handleClick}
        onEndFormClick={onEndFormClickCallback}
        {...question.properties}
        dataTestId={`${question.name}-warning`}
      />
    </Stack>
  );
};
