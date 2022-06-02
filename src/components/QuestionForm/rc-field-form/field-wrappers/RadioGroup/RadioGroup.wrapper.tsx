import { RadioGroup } from "../../../../fields/RadioGroup";
import { FC } from "react";
import { Question, RadioGroupProperties } from "../../QuestionForm.types";
import { Field } from "rc-field-form";

export const RadioGroupWrapper: FC<{
  question: Question;
}> = ({ question }) => (
  <Field name={question.name}>
    {({ value, onChange }) => (
      <RadioGroup
        {...(question.properties as RadioGroupProperties)}
        value={value}
        onChange={onChange}
      />
    )}
  </Field>
);
