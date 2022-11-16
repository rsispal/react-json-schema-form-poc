import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import {
  RadioGroupProperties,
  QuestionFieldWrapperProps,
} from "components/QuestionForm/formik-v2/types";
import { useField } from "formik";
import { FC } from "react";
import RadioGroup from "../../fields/RadioGroup/";

export const RadioGroupFieldWrapper: FC<
  QuestionFieldWrapperProps<RadioGroupProperties>
> = ({ question }) => {
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
