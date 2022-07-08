/* Libraries */
import { FormEvent, FC, useState } from "react";
import Form from "rc-field-form";

/* Components */
import { QuestionField } from "./QuestionField";

/* Utilities */
import { QuestionFormUtilities } from "./QuestionForm.utilities";

/* Types */
import { QuestionFormProps } from "./QuestionForm.types";
import { ValidateError } from "async-validator";

export const QuestionForm: FC<QuestionFormProps> = ({
  showAllQuestions,
  schemaVersion,
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

  const runAsyncValidator = async (
    answers: Record<string, string | boolean | undefined>
  ) => {
    const response = await QuestionFormUtilities.validate(questions, answers);
    if (Array.isArray(response) && response.length > 0) {
      setErrors(response);
      return false;
    }
    setErrors([]);
    return true;
  };

  const handleSubmit = async (
    values: Record<string, string | boolean | undefined>
  ) => {
    const isValid = await runAsyncValidator(values);
    if (isValid) {
      return onSubmitCallback(values);
    }
  };

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    const values = form.getFieldsValue();
    onChangeCallback && onChangeCallback(values);
    runAsyncValidator(values);
    setValues(values);
  };

  const initialValues = getInitialValues();
  const dataset = QuestionFormUtilities.getAllParentQuestions(questions);
  return (
    <Form
      form={form}
      name={formName}
      initialValues={initialValues}
      onChange={handleChange}
      onFinish={handleSubmit}
      data-schemaVersion={schemaVersion}
    >
      {(showAllQuestions ? dataset : dataset.slice(0, 1)).map((q, i) => (
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
