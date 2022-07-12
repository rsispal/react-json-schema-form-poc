import { Button, Text, Stack } from "@chakra-ui/react";
import { Field } from "rc-field-form";
import { FC, useRef } from "react";
import { DynamicText } from "../../../../DynamicText";
import {
  NextQuestionButtonProperties,
  Question,
} from "../../QuestionForm.types";

export const NextQuestionButtonWrapper: FC<{
  question: Question<NextQuestionButtonProperties>;
}> = ({ question }) => {
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
          <Text>{question.prompt}</Text>
          {question.description && <DynamicText data={question.description} />}
          <Button
            onClick={handleClick}
            width={"fit-content"}
            textTransform="uppercase"
            data-testid={`${question.name}-next-question-button`}
          >
            {question.properties.label}
          </Button>
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
