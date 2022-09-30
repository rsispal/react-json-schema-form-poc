import { ChangeEvent, FC } from "react";
import { useField } from "formik";
import { TextInput } from "../../../../fields/TextInput";
import { QuestionFieldRenderProps } from "../../QuestionField/QuestionField.types";
import { TextInputProperties } from "../../QuestionForm.types";
import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";

export const TextInputFieldWrapper: FC<
  QuestionFieldRenderProps<TextInputProperties>
> = ({ question, onEndFormClickCallback }) => {
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
        {...question.properties}
        onChange={handleChange}
        dataTestId={`${question.name}-text-input`}
      />
    </Stack>
  );
};
