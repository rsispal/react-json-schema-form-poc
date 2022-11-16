import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import {
  TextInputProperties,
  QuestionFieldWrapperProps,
} from "components/QuestionForm/formik-v2/types";
import { useField } from "formik";
import { ChangeEvent, FC } from "react";
import TextInput from "../../fields/TextInput";

export const TextInputFieldWrapper: FC<
  QuestionFieldWrapperProps<TextInputProperties>
> = ({ question }) => {
  const [{ onChange }] = useField<string>({
    name: question.name,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(question.name)(e.target.value);

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
      <TextInput
        onChange={handleChange}
        dataTestId={`${question.name}-text-input`}
      />
    </Stack>
  );
};
