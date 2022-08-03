import { FC } from "react";
import { useField } from "formik";
import { RadioGroup } from "../../../../fields/RadioGroup";
import { QuestionFieldRenderProps } from "../../QuestionField/QuestionField.types";
import { RadioGroupProperties } from "../../QuestionForm.types";
import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";

export const RadioGroupFieldWrapper: FC<
  QuestionFieldRenderProps<RadioGroupProperties>
> = ({ question, onEndFormClickCallback }) => {
  const [{ value, onChange }] = useField<string>({
    name: question.name,
  });

  const handleChange = (selected: string) => onChange(question.name)(selected);
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
      <RadioGroup
        {...question.properties}
        value={value}
        onChange={handleChange}
        dataTestId={`${question.name}-radio-group`}
      />
    </Stack>
  );
};
