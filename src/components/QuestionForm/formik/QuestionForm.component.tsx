/* Libraries */
import { FC, useState } from "react";
import { Formik, Form } from "formik";

/* Components */
import { QuestionField } from "./QuestionField";

/* Utilities */
import { QuestionFormUtilities } from "./QuestionForm.utilities";

/* Types */
import { QuestionFormProps } from "./QuestionForm.types";
import { ValidateError } from "async-validator";

export const QuestionForm: FC<QuestionFormProps> = ({
  showAllQuestions,
  schemaVersionMajor,
  schemaVersionMinor,
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
  const [values, setValues] = useState<Record<string, string | undefined>>({});
  const [errors, setErrors] = useState<ValidateError[]>([]);

  const getInitialValues = () => ({});

  const runAsyncValidator = async (
    answers: Record<string, string | undefined>
  ) => {
    const response = await QuestionFormUtilities.validate(questions, answers);
    if (Array.isArray(response) && response.length > 0) {
      setErrors(response);
      return false;
    }
    setErrors([]);
    return true;
  };

  const handleSubmit = async (values: Record<string, string | undefined>) => {
    const isValid = await runAsyncValidator(values);
    if (isValid) {
      return onSubmitCallback(values);
    }
  };

  const initialValues = getInitialValues();
  const dataset = QuestionFormUtilities.getAllParentQuestions(questions);

  const handleChange = (values: Record<string, string | undefined>) => {
    onChangeCallback && onChangeCallback(values);
    runAsyncValidator(values);
    setValues(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={handleChange}
      onSubmit={handleSubmit}
    >
      <Form name={formName}>
        {(showAllQuestions ? dataset : dataset.slice(0, 1)).map((q, i) => (
          <QuestionField
            key={i}
            question={q}
            questions={questions}
            renderQuestion={renderQuestion}
            values={values}
            errors={errors}
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
    </Formik>
  );
};
