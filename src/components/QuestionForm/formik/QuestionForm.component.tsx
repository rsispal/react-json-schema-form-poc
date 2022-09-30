/* Libraries */
import { FC, useState } from "react";
import { Formik, Form } from "formik";

/* Utilities */
import { QuestionFormUtilities } from "./QuestionForm.utilities";

/* Types */
import { QuestionFormProps } from "./QuestionForm.types";
import { ValidateError } from "async-validator";

export const QuestionForm: FC<QuestionFormProps> = ({
  children,
  initialValues,
  schemaVersionMajor,
  schemaVersionMinor,
  formName,
  questions,
  onChangeCallback,
  onSubmitCallback,
  onEndFormClickCallback,
}) => {
  const [values, setValues] = useState<Record<string, string | undefined>>({});
  const [errors, setErrors] = useState<ValidateError[]>([]);

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

  const dataset = QuestionFormUtilities.getAllParentQuestions(questions);

  const handleChange = (values: Record<string, string | undefined>) => {
    // console.log("QuestionForm :: handleChange", values);
    onChangeCallback && onChangeCallback(values);
    runAsyncValidator(values);
    setValues(values);
  };

  return (
    <Formik
      initialValues={initialValues ?? {}}
      validate={handleChange}
      onSubmit={handleSubmit}
      validateOnMount
      validateOnChange
      validateOnBlur
    >
      <Form
        name={formName}
        data-schemaversionmajor={schemaVersionMajor}
        data-schemaversionminor={schemaVersionMinor}
      >
        {children({
          questionsToRender: dataset.slice(0, 1),
          values,
          errors,
          allQuestions: questions,
          onEndFormClickCallback,
        })}
      </Form>
    </Formik>
  );
};
