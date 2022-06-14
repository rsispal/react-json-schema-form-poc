import { Field } from "rc-field-form";
import { FC } from "react";
import { TextInput } from "../../../../fields/TextInput";
import { Question, TextInputProperties } from "../../QuestionForm.types";

export const TextInputWrapper: FC<{
  question: Question<TextInputProperties>;
}> = ({ question }) => (
  <Field name={question.name}>
    {({ value, onChange }) => (
      <TextInput
        {...question.properties}
        defaultValue={value}
        onChange={onChange}
      />
    )}
  </Field>
);
