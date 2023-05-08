import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import { TextInputProperties, SchemaDrivenQuestionFieldWrapperProps } from "components/QuestionForm/formik-v2/types";
import { useField } from "formik";
import { ChangeEvent, FC } from "react";
import TextInput from "../../fields/TextInput";

export const TextInputFieldWrapper: FC<SchemaDrivenQuestionFieldWrapperProps<TextInputProperties>> = ({
  question,
  onAnswerCallback,
}) => {
  const [{ onChange }] = useField<string>({
    name: question.id,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAnswerCallback(question, e.target.value);
    onChange(question.id)(e.target.value);
  };

  return (
    <Stack>
      <Text data-testid={`${question.id}-question-prompt-text`} fontWeight={600} fontSize="larger">
        {question.prompt}
      </Text>
      {question.description && <DynamicText data={question.description} />}
      <TextInput onChange={handleChange} dataTestId={`${question.id}-text-input`} />
    </Stack>
  );
};
