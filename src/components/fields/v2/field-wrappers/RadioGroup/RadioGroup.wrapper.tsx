import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import { RadioGroupProperties, SchemaDrivenQuestionFieldWrapperProps } from "components/QuestionForm/formik-v2/types";
import { useField } from "formik";
import { FC } from "react";
import RadioGroup from "../../fields/RadioGroup/";

export const RadioGroupFieldWrapper: FC<SchemaDrivenQuestionFieldWrapperProps<RadioGroupProperties>> = ({
  question,
  onAnswerCallback,
}) => {
  const [{ value, onChange }] = useField<string>({
    name: question.id,
  });

  const handleChange = (selected: string) => {
    onAnswerCallback(question, selected);
    onChange(question.id)(selected);
  };
  return (
    <Stack>
      <Text data-testid={`${question.id}-question-prompt-text`} fontWeight={600} fontSize="larger">
        {question.prompt}
      </Text>
      {question.description && <DynamicText data={question.description} />}
      <RadioGroup {...question.properties} value={value} onChange={handleChange} dataTestId={`${question.id}-radio-group`} />
    </Stack>
  );
};
