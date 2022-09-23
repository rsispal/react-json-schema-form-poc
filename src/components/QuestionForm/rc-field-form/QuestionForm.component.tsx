/* Libraries */
import { FormEvent, FC, useState } from "react";
import Form from "rc-field-form";

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
  const [form] = Form.useForm<Record<string, string | undefined>>();
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

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    const values = form.getFieldsValue();
    onChangeCallback && onChangeCallback(values);
    runAsyncValidator(values);
    setValues(values);
  };

  const dataset = QuestionFormUtilities.getAllParentQuestions(questions);

  return (
    <Form
      form={form}
      name={formName}
      initialValues={initialValues ?? {}}
      onChange={handleChange}
      onFinish={handleSubmit}
      data-schemaversionmajor={schemaVersionMajor}
      data-schemaversionminor={schemaVersionMinor}
    >
      {children({
        form,
        questionsToRender: dataset.slice(0, 1),
        values,
        errors,
        allQuestions: questions,
        onEndFormClickCallback,
      })}
    </Form>
  );
};
