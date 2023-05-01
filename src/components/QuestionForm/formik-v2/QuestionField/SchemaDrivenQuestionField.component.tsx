import React, { FC, isValidElement } from "react";
import { useField, useFormikContext } from "formik";
import { QuestionFormUtilities } from "../QuestionForm/SchemaDrivenQuestionForm.utilities";
import {
  Question,
  SchemaDrivenQuestionFieldManagerProps,
  SchemaDrivenQuestionFieldProps,
  SchemaDrivenQuestionFormSubmission,
  WarningProperties,
} from "../types";

export const SchemaDrivenQuestionField: FC<SchemaDrivenQuestionFieldProps> = ({
  fields,
  question,
  questions,
  onEndFormCallback,
  onSubmitFormCallback,
  onResetFormCallback,
  questionFieldUI,
}) => {
  const { type, id } = question;
  const [thisField, meta] = useField({ name: id });
  const { values, errors } = useFormikContext<SchemaDrivenQuestionFormSubmission>();

  const FieldComponent = fields[type];
  const WarningFieldComponent = fields["Warning"];

  const QuestionFieldUIWrapper = questionFieldUI;

  const renderFieldLevelErrors = () => <>{meta.error && <p style={{ color: "red" }}>ERROR: {meta.error}</p>}</>;

  const renderFieldLevelWarnings = () => {
    const applicableWarnings: Question<WarningProperties>[] = QuestionFormUtilities.getNextChildWarningForField(
      question,
      questions,
      values,
      errors
    );
    return applicableWarnings.map((w, i) => (
      <WarningFieldComponent
        key={w.id}
        question={w}
        value={thisField.value}
        onEndFormCallback={onEndFormCallback}
        onSubmitFormCallback={onSubmitFormCallback}
        onResetFormCallback={onResetFormCallback}
      />
    ));
  };

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
          {renderFieldLevelErrors()}
          {renderFieldLevelWarnings()}
        </QuestionFieldUIWrapper>
      );
    }
    return (
      <>
        {field}
        {renderFieldLevelErrors()}
        {renderFieldLevelWarnings()}
      </>
    );
  }
  return <p style={{ color: "red", fontWeight: 800 }}>Unsupported field type "{type}"</p>;
};

export const SchemaDrivenQuestionFieldManager: FC<SchemaDrivenQuestionFieldManagerProps> = ({
  fields,
  questions,
  questionFieldUI,
  onSubmitFormCallback,
  onEndFormCallback,
  onResetFormCallback,
}) => {
  const { values, errors } = useFormikContext<SchemaDrivenQuestionFormSubmission>();

  const _visibleQuestions = QuestionFormUtilities.getQuestions(questions, values, errors);

  const visibleQuestions = Object.keys(_visibleQuestions).filter(
    (k) => _visibleQuestions.hasOwnProperty(k) && _visibleQuestions[k] === true
  );

  return (
    <>
      {questions
        .filter((q) => visibleQuestions.includes(q.id))
        .map((question) => (
          <SchemaDrivenQuestionField
            key={question.id}
            fields={fields}
            question={question}
            questions={questions}
            questionFieldUI={questionFieldUI}
            onSubmitFormCallback={onSubmitFormCallback}
            onEndFormCallback={onEndFormCallback}
            onResetFormCallback={onResetFormCallback}
          />
        ))}
    </>
  );
};
