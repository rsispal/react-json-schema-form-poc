import { FC, useRef } from "react";
import { Button } from "@chakra-ui/react";
import { LinkButtonProperties, Question } from "../../QuestionForm.types";
import { Field } from "rc-field-form";

export const LinkButtonWrapper: FC<{
  question: Question;
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
          <a
            href={(question.properties as LinkButtonProperties).url}
            target={(question.properties as LinkButtonProperties).target}
            onClick={handleClick}
          >
            <Button onClick={handleClick} width={"fit-content"}>
              {(question.properties as LinkButtonProperties).url}
            </Button>
          </a>
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
