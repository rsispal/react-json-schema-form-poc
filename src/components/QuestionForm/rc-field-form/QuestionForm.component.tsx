import { Button } from "@chakra-ui/react";

import { FormEvent, FC, useEffect, useState } from "react";
import Form from "rc-field-form";

import { QuestionField } from "./QuestionField";
import { QuestionFormProps } from "./QuestionForm.types";
import { FieldError, ValidateErrorEntity } from "rc-field-form/es/interface";
import Schema, {
  Rule,
  Rules,
  ValidateError,
  ValidateFieldsError,
  Values,
} from "async-validator";

export const QuestionForm: FC<QuestionFormProps> = ({
  showAllQuestions,
  submitButton,
  questions,
  onChangeCallback,
  onSubmitCallback,
  renderQuestion,
  onEndFormClickCallback,
}) => {
  const [form] = Form.useForm();
  const [values, setValues] = useState<
    Record<string, string | boolean | undefined>
  >({});
  const [errors, setErrors] = useState<ValidateError[]>([]);

  const getInitialValues = () => ({});

  const runAsyncValidator = async (
    values: Record<string, string | boolean | undefined>
  ) => {
    const questionNames = Object.keys(values);

    const answeredQuestions = questions.filter((question) =>
      questionNames.includes(question.name)
    );

    const validationRules: Rules = {};

    answeredQuestions.forEach(
      (question) =>
        (validationRules[question.name] =
          (question.validation as Rule | undefined) ?? [])
    );

    const validator = new Schema(validationRules);
    let formErrors: ValidateError[] = [];
    const response = await validator
      .validate(values)
      .catch(
        ({
          errors,
          fields,
        }: {
          errors: ValidateError[] | null;
          fields: ValidateFieldsError;
        }) => {
          console.log("VALIDATOR ERROR: ", { errors, fields, validationRules });
          if (errors) {
            formErrors.push(...errors);
          }
          return new Error("Validation failed");
        }
      );
    if (response instanceof Error) {
      setErrors(formErrors);
      return false;
    }
    console.log("VALIDATOR SUCCESS: ", { response, validationRules });
    setErrors([]);
    return true;
  };

  const handleSubmit = async (
    values: Record<string, string | boolean | undefined>
  ) => {
    const isValid = await runAsyncValidator(values);
    if (!isValid) {
      console.log("Cannot submit - form has errors...");
      return;
    }
    console.log("submitting...");
    onSubmitCallback(values);
  };

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    const values = form.getFieldsValue();
    onChangeCallback && onChangeCallback(values);
    runAsyncValidator(values);
    setValues(values);
  };

  const renderSubmitButton = () => (
    <Button type="submit">{submitButton.label}</Button>
  );

  const initialValues = getInitialValues();

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onChange={handleChange}
      onFinish={handleSubmit}
    >
      {[questions.filter((q) => q.isChildQuestion === false)[0]].map((q, i) => (
        <QuestionField
          key={i}
          question={q}
          questions={questions}
          renderQuestion={renderQuestion}
          values={values}
          errors={errors}
          form={form}
          onEndFormClickCallback={onEndFormClickCallback}
        />
      ))}
      {renderSubmitButton()}
    </Form>
  );
};
