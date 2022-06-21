import { FormEvent, FC, useState } from "react";
import Form from "rc-field-form";

import { QuestionField } from "./QuestionField";
import { QuestionFormProps } from "./QuestionForm.types";
import Schema, {
  Rule,
  Rules,
  ValidateError,
  ValidateFieldsError,
} from "async-validator";

export const QuestionForm: FC<QuestionFormProps> = ({
  showAllQuestions,
  __version,
  formName,
  questions,
  onChangeCallback,
  onSubmitCallback,
  renderQuestion,
  onEndFormClickCallback,
  renderLinkButtonField,
  renderRadioGroupField,
  renderTextInputField,
  renderNextQuestionButtonField,
  renderButtonGroupField,
  renderPromptField,
  renderWarningField,
  renderFieldErrorMessage,
  renderSubmitButtonField,
}) => {
  const [form] = Form.useForm();
  const [values, setValues] = useState<
    Record<string, string | boolean | undefined>
  >({});
  const [errors, setErrors] = useState<ValidateError[]>([]);

  const getInitialValues = () => ({});

  // TODO: Move to Utilities
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
    setErrors([]);
    return true;
  };

  const handleSubmit = async (
    values: Record<string, string | boolean | undefined>
  ) => {
    const isValid = await runAsyncValidator(values);
    if (!isValid) {
      return;
    }
    onSubmitCallback(values);
  };

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    const values = form.getFieldsValue();
    onChangeCallback && onChangeCallback(values);
    runAsyncValidator(values);
    setValues(values);
  };

  const initialValues = getInitialValues();

  return (
    <Form
      form={form}
      name={formName}
      initialValues={initialValues}
      onChange={handleChange}
      onFinish={handleSubmit}
    >
      {/* TODO: Refactor this into a utility fn */}
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
          renderLinkButtonField={renderLinkButtonField}
          renderRadioGroupField={renderRadioGroupField}
          renderTextInputField={renderTextInputField}
          renderNextQuestionButtonField={renderNextQuestionButtonField}
          renderButtonGroupField={renderButtonGroupField}
          renderPromptField={renderPromptField}
          renderWarningField={renderWarningField}
          renderFieldErrorMessage={renderFieldErrorMessage}
          renderSubmitButtonField={renderSubmitButtonField}
        />
      ))}
    </Form>
  );
};
