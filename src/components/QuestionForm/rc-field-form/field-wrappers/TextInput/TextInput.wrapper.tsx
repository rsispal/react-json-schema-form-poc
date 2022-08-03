import { Stack, Text } from "@chakra-ui/react";
import { Field } from "rc-field-form";
import { FC } from "react";
import { DynamicText } from "../../../../DynamicText";
import { TextInput } from "../../../../fields/TextInput";
import { Question, TextInputProperties } from "../../QuestionForm.types";

export const TextInputFieldWrapper: FC<{
  question: Question<TextInputProperties>;
}> = ({ question }) => (
  <Field name={question.name}>
    {({ value, onChange }) => (
      <Stack>
        <Text
          data-testid={`${question.name}-question-prompt-text`}
          fontWeight={600}
          fontSize="larger"
        >
          {question.prompt}
        </Text>
        {question.description && (
          <DynamicText
            data-testid={`${question.name}-question-description-text`}
            data={question.description}
          />
        )}
        <TextInput
          {...question.properties}
          defaultValue={value}
          onChange={onChange}
          dataTestId={`${question.name}-text-input`}
        />
      </Stack>
    )}
  </Field>
);
