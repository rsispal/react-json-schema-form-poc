/* Libraries */
import { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

/* Types */
import { QuestionFormProps, QuestionFormSubmission } from "../types";
import { validate } from "./QuestionForm.validation";
import { QuestionFieldManager } from "../QuestionField/QuestionField.component";

export const QuestionForm: FC<QuestionFormProps> = ({
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
  const handleSubmit = (values: QuestionFormSubmission, _formikHelpers: FormikHelpers<QuestionFormSubmission>) =>
    onSubmitCallback(values);

  const handleValidation = (values: QuestionFormSubmission) => {
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
    <Formik<QuestionFormSubmission>
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={false}
      validateOnMount={false}
      validate={handleValidation}
      initialValues={initialValues ?? {}}>
      <Form name={formName} data-schemaversionmajor={schemaVersionMajor} data-schemaversionminor={schemaVersionMinor}>
        <QuestionFieldManager
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
