import { Button } from "@chakra-ui/react";

import { FC, useEffect, useState } from "react";
import Form from "rc-field-form";

import { QuestionField } from "./QuestionField";
import { QuestionFormProps } from "./QuestionForm.types";

export const QuestionForm: FC<QuestionFormProps> = ({
  showAllQuestions,
  submitButton,
  questions,
  onSubmitCallback,
  renderQuestion,
}) => {
  const [form] = Form.useForm();
  const [values, setValues] = useState<Record<string, string | undefined>>({});
  const getInitialValues = () => ({});

  const handleSubmit = (values: Record<string, string | undefined>) => onSubmitCallback(values);

  const renderSubmitButton = () => <Button type="submit">{submitButton.label}</Button>;

  const handleChange = () => {
    setValues(form.getFieldsValue());
  };
  useEffect(() => {
    handleSubmit(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const initialValues = getInitialValues();

  return (
    <Form form={form} initialValues={initialValues} onChange={() => handleChange()} onFinish={handleSubmit}>
      {[questions.filter((q) => q.isChildQuestion === false)[0]].map((q, i) => (
        <QuestionField key={i} question={q} questions={questions} renderQuestion={renderQuestion} values={values} form={form} />
      ))}
      {renderSubmitButton()}
    </Form>
  );
};
