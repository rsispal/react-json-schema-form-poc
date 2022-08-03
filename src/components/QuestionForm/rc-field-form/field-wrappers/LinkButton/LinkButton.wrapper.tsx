import { FC, useRef } from "react";
import { LinkButtonProperties, Question } from "../../QuestionForm.types";
import { Field } from "rc-field-form";
import { LinkButton } from "../../../../fields/LinkButton";
import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "../../../../DynamicText";

export const LinkButtonFieldWrapper: FC<{
  question: Question<LinkButtonProperties>;
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
          <Text
            data-testid={`${question.name}-question-prompt-text`}
            fontWeight={600}
            fontSize="larger"
          >
            {question.prompt}
          </Text>
          {question.description && <DynamicText data={question.description} />}
          <LinkButton
            {...question.properties}
            onClickCallback={handleClick}
            dataTestId={`${question.name}-link-button`}
          />

          <input
            hidden
            name={question.name}
            ref={checkboxRef}
            type="checkbox"
            defaultChecked={value}
            onChange={() => onChange("SELECTED")}
          />
        </Stack>
      )}
    </Field>
  );
};
