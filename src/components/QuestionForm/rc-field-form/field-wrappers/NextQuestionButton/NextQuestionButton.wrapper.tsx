import { Button } from "@chakra-ui/react";
import { FC, useRef } from "react";
import {
  FormField,
  NextQuestionButtonProperties,
} from "../../QuestionForm.types";

export const NextQuestionButtonWrapper: FC<{
  value: boolean;
  onChange: any;
  field: FormField;
}> = ({ value, onChange, field }) => {
  const handleClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  };

  const checkboxRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button onClick={handleClick} width={"fit-content"}>
        {(field.properties as NextQuestionButtonProperties).label}
      </Button>
      <input
        hidden
        name={field.properties.name}
        ref={checkboxRef}
        type="checkbox"
        defaultChecked={value}
        onChange={() => onChange(true)}
      />
    </>
  );
};
