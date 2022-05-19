import { Button } from "@chakra-ui/react";

import { FC } from "react";
import { Form } from "react-final-form";

import { QuestionField } from "./QuestionField";
import { QuestionFormProps } from "./QuestionForm.types";

export const QuestionForm: FC<QuestionFormProps> = ({ showAllQuestions, questions, onSubmitCallback, renderQuestion }) => {
  const getInitialValues = () => ({});

  const handleSubmit = (values: Record<string, string | undefined>) => onSubmitCallback(values);
  const initialValues = getInitialValues();

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {[questions.filter((q) => q.isChildQuestion === false)[0]].map((q, i) =>
            renderQuestion(<QuestionField key={i} question={q} questions={questions} />)
          )}
          <Button type="submit">Submit</Button>
        </form>
      )}
    />
  );
};
