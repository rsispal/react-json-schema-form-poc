/* Libraries */
import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

/* Components */
import { SchemaDrivenQuestionFieldManager } from "../SchemaDrivenQuestionField/SchemaDrivenQuestionField.component";

/* Validation */
import { validate } from "./SchemaDrivenQuestionForm.validation";

/* Types */
import { SchemaDrivenQuestionFormProps, SchemaDrivenQuestionFormSubmission } from "../types";

export const SchemaDrivenQuestionForm: FC<SchemaDrivenQuestionFormProps> = ({
  fields,
  initialValues,
  schemaVersionMajor,
  schemaVersionMinor,
  formName,
  questions,
  submitOnChange,
  questionFieldUI,
  onSubmitCallback,
  onEndFormCallback,
}) => {
  const handleSubmit = (
    values: SchemaDrivenQuestionFormSubmission,
    _formikHelpers: FormikHelpers<SchemaDrivenQuestionFormSubmission>
  ) => onSubmitCallback(values);

  const handleValidation = (values: SchemaDrivenQuestionFormSubmission) => {
    const outcome = validate(values, questions);
    if (submitOnChange && Object.keys(outcome).length === 0) {
      onSubmitCallback(values);
    }
    return outcome;
  };

  return (
    <Formik<SchemaDrivenQuestionFormSubmission>
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={false}
      validateOnMount={false}
      validate={handleValidation}
      initialValues={initialValues ?? {}}>
      <Form name={formName} data-schemaversionmajor={schemaVersionMajor} data-schemaversionminor={schemaVersionMinor}>
        <SchemaDrivenQuestionFieldManager
          fields={fields}
          questions={questions}
          questionFieldUI={questionFieldUI}
          onEndFormCallback={onEndFormCallback}
        />
      </Form>
    </Formik>
  );
};
