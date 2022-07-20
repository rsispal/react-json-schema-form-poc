import { RadioGroup } from "../../../../fields/RadioGroup";
import { FC } from "react";
import { Question, RadioGroupProperties } from "../../QuestionForm.types";
import { Field } from "rc-field-form";
import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "../../../../DynamicText/";

export const RadioGroupWrapper: FC<{
  question: Question<RadioGroupProperties>;
}> = ({ question }) => (
  <Field name={question.name}>
    {({ value, onChange }) => (
      <Stack>
        <Text
          data-testid={`${question.name}-prompt`}
          fontWeight={600}
          fontSize="larger"
        >
          {question.prompt}
        </Text>
        {question.description && <DynamicText data={question.description} />}
        <RadioGroup
          {...question.properties}
          value={value}
          onChange={onChange}
          dataTestId={`${question.name}-radio-group`}
        />
      </Stack>
    )}
  </Field>
);
