import { Stack, Text } from "@chakra-ui/react";
import { Field } from "rc-field-form";
import { FC, useRef } from "react";
import { DynamicText } from "../../../../DynamicText";
import { Warning } from "../../../../fields/Warning";
import { Question, WarningProperties } from "../../QuestionForm.types";

export const WarningWrapper: FC<{
  question: Question<WarningProperties>;
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
          <Text fontWeight={600}>{question.prompt}</Text>
          {question.description && <DynamicText data={question.description} />}
          <Warning
            onContinueClick={handleClick}
            onEndFormClick={onEndFormClickCallback}
            {...question.properties}
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
