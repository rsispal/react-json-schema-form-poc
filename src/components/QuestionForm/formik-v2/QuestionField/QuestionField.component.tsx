import { useField, useFormikContext } from "formik";
import React, { FC, isValidElement } from "react";
import { QuestionFormUtilities } from "../QuestionForm/QuestionForm.utilities";
import {
  QuestionFieldManagerProps,
  QuestionFieldProps,
  QuestionFormSubmission,
} from "../types/";

export const QuestionField: FC<QuestionFieldProps> = ({
  fields,
  question,
  previousQuestion,
  nextQuestion,
  onEndFormCallback,
  onSubmitFormCallback,
  onResetFormCallback,
  questionFieldUI,
}) => {
  const { type, name } = question;
  const { values, errors } = useFormikContext<QuestionFormSubmission>();
  const [thisField, meta, helpers] = useField({ name });

  const FieldComponent = fields[type];

  const QuestionFieldUIWrapper = questionFieldUI;

  const renderFieldLevelWarnings = () => (
    <>{meta.error && <p style={{ color: "red" }}>ERROR: {meta.error}</p>}</>
  );

  const renderField = () => (
    <FieldComponent
      question={question}
      value={thisField.value}
      error={meta.error}
      onEndFormCallback={onEndFormCallback}
      onSubmitFormCallback={onSubmitFormCallback}
      onResetFormCallback={onResetFormCallback}
    />
  );

  const field = renderField();

  if (isValidElement(field)) {
    if (question.ui && QuestionFieldUIWrapper) {
      return (
        <QuestionFieldUIWrapper>
          {field}
          {renderFieldLevelWarnings()}
        </QuestionFieldUIWrapper>
      );
    }
    return (
      <>
        {field}
        {renderFieldLevelWarnings()}
      </>
    );
  }
  return (
    <p style={{ color: "red", fontWeight: 800 }}>
      Unsupported field type "{type}"
    </p>
  );
};

export const QuestionFieldManager: FC<QuestionFieldManagerProps> = ({
  fields,
  questions,
  questionFieldUI,
  onSubmitFormCallback,
  onEndFormCallback,
  onResetFormCallback,
}) => {
  const { values, errors } = useFormikContext<QuestionFormSubmission>();

  const _visibleQuestions = QuestionFormUtilities.getQuestions(
    questions,
    values,
    errors
  );

  const visibleQuestions = Object.keys(_visibleQuestions).filter(
    (k) => _visibleQuestions.hasOwnProperty(k) && _visibleQuestions[k] === true
  );

  return (
    <>
      {questions
        .filter((q) => visibleQuestions.includes(q.name))
        .map((question, i, all) => (
          <QuestionField
            key={question.id}
            fields={fields}
            question={question}
            previousQuestion={all[i - 1] ?? undefined}
            nextQuestion={all.at(i + 1) ?? undefined}
            questionFieldUI={questionFieldUI}
            onSubmitFormCallback={onSubmitFormCallback}
            onEndFormCallback={onEndFormCallback}
            onResetFormCallback={onResetFormCallback}
          />
        ))}
    </>
  );
};
