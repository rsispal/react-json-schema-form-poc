import { Stack, Text } from "@chakra-ui/react";
import { Field } from "rc-field-form";
import { FC } from "react";
import { DynamicText } from "../../../../DynamicText";
import { TextInput } from "../../../../fields/TextInput";
import { Question, TextInputProperties } from "../../QuestionForm.types";

export const TextInputWrapper: FC<{
  question: Question<TextInputProperties>;
}> = ({ question }) => (
  <Field name={question.name}>
    {({ value, onChange }) => (
      <Stack>
        <Text fontWeight={600}>{question.prompt}</Text>
        {question.description && <DynamicText data={question.description} />}
        <TextInput
          {...question.properties}
          defaultValue={value}
          onChange={onChange}
          data-testid={`${question.name}-text-input`}
        />
      </Stack>
    )}
  </Field>
);
