import { Stack, Text } from "@chakra-ui/react";
import { Field } from "rc-field-form";
import { FC, useRef } from "react";
import { DynamicText } from "../../../../DynamicText";
import { Prompt } from "../../../../fields/Prompt";
import { Question, PromptProperties } from "../../QuestionForm.types";

export const PromptWrapper: FC<{
  question: Question<PromptProperties>;
  onEndFormClickCallback: () => void;
}> = ({ question, onEndFormClickCallback }) => {
  const handleClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  };

  const checkboxRef = useRef<HTMLInputElement>(null);

  return (
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
          <Prompt
            onContinueClick={handleClick}
            onEndFormClick={onEndFormClickCallback}
            {...question.properties}
            dataTestId={`${question.name}-prompt`}
          />
          <input
            hidden
            name={question.name}
            ref={checkboxRef}
            type="checkbox"
            defaultChecked={value}
            onChange={() => onChange(true)}
          />
        </Stack>
      )}
    </Field>
  );
};
