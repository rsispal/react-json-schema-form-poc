import { FC, useRef } from "react";
import { LinkButtonProperties, Question } from "../../QuestionForm.types";
import { Field } from "rc-field-form";
import { LinkButton } from "../../../../fields/LinkButton";
import { Stack, Text } from "@chakra-ui/react";

export const LinkButtonWrapper: FC<{
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
          <Text>{question.prompt}</Text>
          <LinkButton {...question.properties} onClickCallback={handleClick} />

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
