import { Button } from "@chakra-ui/react";

import { ChangeEvent, FC, useEffect, useState } from "react";
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

  const handleSubmit = (values: Record<string, string | undefined>) =>
    onSubmitCallback(values);

  const renderSubmitButton = () => (
    <Button type="submit">{submitButton.label}</Button>
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const fieldWithChange = e.target;

    const newValues = form.getFieldsValue();
    // TODO: Handle specific conditions based on answers
    handleSpecificCondition(values);

    setValues(newValues);
  };

  const handleSpecificCondition = (
    values: Record<string, string | undefined>
  ) => {
    const isQ1AnsweredAsYes = values["Q1"];
    const isQ1_1_YLinkClicked = values["Q1_1_Y"];

    if (isQ1AnsweredAsYes && isQ1_1_YLinkClicked) {
      console.log(
        "User has gone to pensionwise via link. Submitting form answers"
      );
    }
  };

  useEffect(() => {
    handleSubmit(values);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const initialValues = getInitialValues();

  return (
    <Form
      form={form}
      initialValues={initialValues}
      // @ts-expect-error
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
          form={form}
        />
      ))}
      {renderSubmitButton()}
    </Form>
  );
};
