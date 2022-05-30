import { RadioGroup } from "../../../../fields/RadioGroup";
import { FC } from "react";
import { FormField, RadioGroupProperties } from "../../QuestionForm.types";

export const RadioGroupWrapper: FC<{
  value: string | undefined;
  onChange: any;
  field: FormField;
}> = ({ value, onChange, field }) => (
  <RadioGroup
    {...(field.properties as RadioGroupProperties)}
    value={value}
    onChange={onChange}
  />
);
