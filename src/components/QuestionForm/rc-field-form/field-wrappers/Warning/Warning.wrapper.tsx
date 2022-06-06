import { Field } from "rc-field-form";
import { FC, useRef } from "react";
import { Warning } from "../../../../fields/Warning";
import { Question, WarningProperties } from "../../QuestionForm.types";

export const WarningWrapper: FC<{
  question: Question;
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
        <>
          <Warning
            onContinueClick={handleClick}
            onEndFormClick={onEndFormClickCallback}
            {...(question.properties as WarningProperties)}
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
