import { FC } from "react";
import { TextInput } from "../../../../fields/TextInput";
import { FormField, TextInputProperties } from "../../QuestionForm.types";

export const TextInputWrapper: FC<{
  value: string | undefined;
  onChange: any;
  field: FormField;
}> = ({ value, onChange, field }) => (
  <TextInput
    {...(field.properties as TextInputProperties)}
    value={value}
    onChange={onChange}
  />
);
