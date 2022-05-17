import { FC, ReactElement } from "react";
import { Alert, Stack, Box, Text } from "@chakra-ui/react";
import { head } from "lodash";
import { useForm, Field } from "react-final-form";
import { LinkButton } from "../../fields/LinkButton";
import { RadioGroup } from "../../fields/RadioGroup";

import { FormField, LinkButtonProperties, RadioGroupProperties, SupportedFormField } from "../QuestionForm.types";
import { QuestionFieldProps } from "./QuestionField.types";

export const QuestionField: FC<QuestionFieldProps> = ({ questions, question }) => {
  const { field } = question;

  const form = useForm();

  const getFieldValue = (fieldName: string) => form.getFieldState(fieldName)?.value;

  const getQuestionByName = (name: string) => head(questions.filter((q) => q.field.properties.name === name));

  const generateWarnings = (field: FormField) => {
    const currentValue = getFieldValue(field.properties.name);
    return (
      <>
        {(field.warnings || []).map((warning, i) =>
          warning.equals === currentValue ? (
            <Alert key={i} status="warning">
              {warning.prompt}
            </Alert>
          ) : null
        )}
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
    <Field name={field.properties.name}>
      {({ input }) => (
        <Stack>
          <Text>{field.prompt}</Text>
          <RadioGroup {...input} {...(field.properties as RadioGroupProperties)} />
        </Stack>
      )}
    </Field>
  );

  const generateQuestion = (field: FormField | undefined, subField: FormField | undefined, indent?: boolean): ReactElement => {
    //  GENERATE MAIN FIELD
    if (field) {
      switch (field.type) {
        case SupportedFormField.LinkButton: {
          return (
            <>
              {renderLinkButton(field)}
              {generateWarnings(field)}
              {generateQuestion(undefined, field, true)}
            </>
          );
        }
        case SupportedFormField.RadioGroup: {
          return (
            <>
              {renderRadioGroup(field)}
              {generateWarnings(field)}
              {generateQuestion(undefined, field, true)}
            </>
          );
        }
      }
    }

    // GENERATE VALUE-BASED SUBFIELDS
    if (subField) {
      const currentValue = getFieldValue(subField.properties.name);
      const childQuestions = (subField.dependants || []).filter((q) => q.equals === currentValue).map((f) => f.child);
      return (
        <Box marginTop={4} borderTop="1px solid #d8d8d8">
          {childQuestions.map((n, i) => {
            const q = getQuestionByName(n);
            if (q) {
              const { field } = q;
              switch (field.type) {
                case SupportedFormField.LinkButton: {
                  return (
                    <Box key={i}>
                      {renderLinkButton(field)}
                      {generateWarnings(field)}
                      {generateQuestion(undefined, field, false)}
                    </Box>
                  );
                }
                case SupportedFormField.RadioGroup: {
                  return (
                    <Box key={i}>
                      {renderRadioGroup(field)}
                      {generateWarnings(field)}
                      {generateQuestion(undefined, field, false)}
                    </Box>
                  );
                }
              }
            }
            return null;
          })}
        </Box>
      );
    }
    return <></>;
  };

  return (
    <Box borderTop="1px solid #d8d8d8" padding={4}>
      {generateQuestion(field, undefined)}
    </Box>
  );
};
