import { Field } from "rc-field-form";
import { FC, useRef } from "react";
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
        <>
          <Prompt
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
        </>
      )}
    </Field>
  );
};
