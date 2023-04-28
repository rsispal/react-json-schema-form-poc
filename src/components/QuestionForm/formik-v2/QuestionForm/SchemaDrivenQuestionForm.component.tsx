/* Libraries */
import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

/* Types */
import { SchemaDrivenQuestionFormProps, SchemaDrivenQuestionFormSubmission } from "../types";
import { validate } from "./SchemaDrivenQuestionForm.validation";
import { SchemaDrivenQuestionFieldManager } from "../QuestionField/SchemaDrivenQuestionField.component";

export const SchemaDrivenQuestionForm: FC<SchemaDrivenQuestionFormProps> = ({
  fields,
  initialValues,
  schemaVersionMajor,
  schemaVersionMinor,
  formName,
  questions,
  onSubmitCallback,
  submitOnChange,
  questionFieldUI,
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

  // Field-level callbacks (TODO: figure out whether these need to be surfaced here, or can be implemented in QuestionField directly via useFormikContext hook?)
  const handleSubmitFormCallback = () => undefined;
  const handleEndFormCallback = () => undefined;
  const handleResetFormCallback = () => undefined; // Needed at all?

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
          onSubmitFormCallback={handleSubmitFormCallback} // Not needed right???
          onEndFormCallback={handleEndFormCallback}
          onResetFormCallback={handleResetFormCallback}
        />
      </Form>
    </Formik>
  );
};
