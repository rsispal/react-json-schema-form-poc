import { FC, useRef } from "react";
import { Button } from "@chakra-ui/react";
import { LinkButtonProperties, Question } from "../../QuestionForm.types";
import { Field } from "rc-field-form";
import { LinkButton } from "../../../../fields/LinkButton";

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
          <LinkButton
            {...(question.properties as LinkButtonProperties)}
            onClickCallback={handleClick}
          />

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
