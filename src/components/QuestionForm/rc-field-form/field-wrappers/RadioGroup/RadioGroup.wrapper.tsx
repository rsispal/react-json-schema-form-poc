import { RadioGroup } from "../../../../fields/RadioGroup";
import { FC } from "react";
import { Question, RadioGroupProperties } from "../../QuestionForm.types";
import { Field } from "rc-field-form";
import { Stack, Text } from "@chakra-ui/react";

export const RadioGroupWrapper: FC<{
  question: Question<RadioGroupProperties>;
}> = ({ question }) => (
  <Field name={question.name}>
    {({ value, onChange }) => (
      <Stack>
        <Text>{question.prompt}</Text>
        <RadioGroup
          {...question.properties}
          value={value}
          onChange={onChange}
        />
      </Stack>
    )}
  </Field>
);
