import React, { createElement, FC, isValidElement, useMemo } from "react";
import { FieldMetaProps, useField, useFormikContext } from "formik";
import { QuestionFormUtilities } from "../SchemaDrivenQuestionForm/SchemaDrivenQuestionForm.utilities";
import {
  Question,
  SchemaDrivenQuestionFieldManagerProps,
  SchemaDrivenQuestionFieldProps,
  SchemaDrivenQuestionFormSubmission,
  WarningProperties,
} from "../types";

const FieldLevelError: FC<FieldMetaProps<string>> = ({ error }) => <>{error && <p style={{ color: "red" }}>ERROR: {error}</p>}</>;

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

  const renderContent = () => (
    <>
      <FieldComponent
        question={question}
        value={thisField.value}
        error={meta.error}
        onEndFormCallback={onEndFormCallback}
        onSubmitFormCallback={onSubmitFormCallback}
        onResetFormCallback={onResetFormCallback}
      />
      <FieldLevelError {...meta} />
      {renderFieldLevelWarnings()}
    </>
  );
  if (!!FieldComponent && isValidElement(createElement(FieldComponent))) {
    if (question.ui && QuestionFieldUIWrapper) {
      return <QuestionFieldUIWrapper>{renderContent()}</QuestionFieldUIWrapper>;
    }
    return <>{renderContent()}</>;
  }
  return (
    <p style={{ color: "red", fontWeight: 800 }}>
      Unsupported field type "{type}". Check component map for matching element and schema for errors.
    </p>
  );
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

  return (
    <>
      {useMemo(
        () =>
          QuestionFormUtilities.getQuestionsToRender(questions, values, errors).map((question) => (
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
          )),
        [questions, values, errors, fields, onEndFormCallback, onSubmitFormCallback, onResetFormCallback, questionFieldUI]
      )}
    </>
  );
};
