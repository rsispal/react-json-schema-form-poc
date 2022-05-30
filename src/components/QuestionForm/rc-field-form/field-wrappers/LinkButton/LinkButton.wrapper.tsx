import { FC, useRef } from "react";
import { Button } from "@chakra-ui/react";
import { FormField, LinkButtonProperties } from "../../QuestionForm.types";

export const LinkButtonWrapper: FC<{
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
      <a
        href={(field.properties as LinkButtonProperties).url}
        target={(field.properties as LinkButtonProperties).target}
        onClick={handleClick}
      >
        <Button onClick={handleClick} width={"fit-content"}>
          {(field.properties as LinkButtonProperties).url}
        </Button>
      </a>
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
