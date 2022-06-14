import { Button } from "@chakra-ui/react";
import { Field } from "rc-field-form";
import { FC, useRef } from "react";
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
        <>
          <Button onClick={handleClick} width={"fit-content"}>
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
        </>
      )}
    </Field>
  );
};
