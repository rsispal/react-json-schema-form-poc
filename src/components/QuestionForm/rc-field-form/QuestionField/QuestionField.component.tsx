import { FC, Fragment, ReactElement } from "react";
import { Alert, Stack, Text } from "@chakra-ui/react";

import { Field } from "rc-field-form";

import { LinkButton } from "../../../fields/LinkButton";
import { RadioGroup } from "../../../fields/RadioGroup";

import {
  FormField,
  LinkButtonProperties,
  RadioGroupProperties,
  SupportedFormField,
  TextInputProperties,
} from "../QuestionForm.types";
import { QuestionFieldProps } from "./QuestionField.types";
import { TextInput } from "../../../fields/TextInput";
import { QuestionFormUtilities } from "../QuestionForm.utilities";

const RadioGroupWrapper: FC<{ value: string | undefined; onChange: any; field: FormField }> = ({ value, onChange, field }) => (
  <RadioGroup {...(field.properties as RadioGroupProperties)} value={value} onChange={onChange} />
);

const TextInputWrapper: FC<{ value: string | undefined; onChange: any; field: FormField }> = ({ value, onChange, field }) => (
  <TextInput {...(field.properties as TextInputProperties)} value={value} onChange={onChange} />
);

export const QuestionField: FC<QuestionFieldProps> = ({ questions, question, renderQuestion, values, form }) => {
  const { field } = question;

  const getFieldValue = (fieldName: string) => values[fieldName] as string | undefined; //form.getFieldState(fieldName)?.value as string | undefined;
  const getFieldError = (fieldName: string) => form.getFieldError(fieldName);

  const generateError = (fieldName: string) => {
    const errors = getFieldError(fieldName);
    return (
      <>
        {errors.map((error, i) => (
          <Text key={i} color="red">
            {error}
          </Text>
        ))}
      </>
    );
  };
  const generateWarnings = (field: FormField) => {
    const currentValue = getFieldValue(field.properties.name);
    const applicableWarnings = QuestionFormUtilities.getWarningsForField(field.warnings, currentValue);
    return (
      <>
        {applicableWarnings?.map(({ prompt }, i) => (
          <Alert key={i} status="warning">
            {prompt}
          </Alert>
        ))}
      </>
    );
  };

  const renderLinkButton = (field: FormField) => (
    <>
      <Text>{field.prompt}</Text>
      <LinkButton {...(field.properties as LinkButtonProperties)} />
    </>
  );

  const renderRadioGroup = (field: FormField) => (
    <Stack>
      <Text>{field.prompt}</Text>
      <Field name={field.properties.name} rules={field.validation}>
        {({ value, onChange }) => <RadioGroupWrapper value={value} onChange={onChange} field={field} />}
      </Field>
    </Stack>
  );

  const renderTextInput = (field: FormField) => (
    <Stack>
      <Text>{field.prompt}</Text>
      <Field name={field.properties.name}>
        {({ value, onChange }) => <TextInputWrapper value={value} onChange={onChange} field={field} />}
      </Field>
    </Stack>
  );

  const generateField = (field: FormField, key?: number) => {
    switch (field.type) {
      case SupportedFormField.LinkButton: {
        const doesFieldHaveError = getFieldError(field.properties.name).length > 0;

        return (
          <Fragment key={field.properties.name}>
            {renderQuestion(
              <Fragment>
                {generateError(field.properties.name)}
                {renderLinkButton(field)}
                {generateWarnings(field)}
              </Fragment>
            )}
            {!doesFieldHaveError && generateQuestion(undefined, field)}
          </Fragment>
        );
      }
      case SupportedFormField.RadioGroup: {
        const doesFieldHaveError = getFieldError(field.properties.name).length > 0;

        return (
          <Fragment key={field.properties.name}>
            {renderQuestion(
              <Fragment>
                {generateError(field.properties.name)}
                {renderRadioGroup(field)}
                {generateWarnings(field)}
              </Fragment>
            )}
            {!doesFieldHaveError && generateQuestion(undefined, field)}
          </Fragment>
        );
      }
      case SupportedFormField.TextInput: {
        const doesFieldHaveError = getFieldError(field.properties.name).length > 0;

        return (
          <Fragment key={field.properties.name}>
            {renderQuestion(
              <Fragment>
                {generateError(field.properties.name)}
                {renderTextInput(field)}
                {generateWarnings(field)}
              </Fragment>
            )}
            {!doesFieldHaveError && generateQuestion(undefined, field)}
          </Fragment>
        );
      }
    }
  };
  const generateQuestion = (field: FormField | undefined, subField: FormField | undefined): ReactElement | null => {
    //  GENERATE MAIN FIELD
    if (field) {
      getFieldError(field.properties.name);
      return generateField(field);
    }

    // GENERATE VALUE-BASED SUBFIELDS
    if (subField) {
      getFieldError(subField.properties.name);
      const currentValue = getFieldValue(subField.properties.name);
      const childQuestions = QuestionFormUtilities.getChildQuestionsForParent(questions, subField.next, currentValue);

      return <>{childQuestions.map((q) => generateField(q.field))}</>;
    }
    return null;
  };

  return generateQuestion(field, undefined);
};
