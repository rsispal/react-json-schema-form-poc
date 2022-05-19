import { FC, Fragment, ReactElement } from "react";
import { Alert, Stack, Box, Text } from "@chakra-ui/react";
import { head } from "lodash";
import { useForm, Field } from "react-final-form";
import { LinkButton } from "../../fields/LinkButton";
import { RadioGroup } from "../../fields/RadioGroup";

import {
  FormField,
  LinkButtonProperties,
  RadioGroupProperties,
  SupportedFormField,
  TextInputProperties,
} from "../QuestionForm.types";
import { QuestionFieldProps } from "./QuestionField.types";
import { TextInput } from "../../fields/TextInput";
import { QuestionFormUtilities } from "../QuestionForm.utilities";

export const QuestionField: FC<QuestionFieldProps> = ({ questions, question }) => {
  const { field } = question;

  const form = useForm();

  const getFieldValue = (fieldName: string) => form.getFieldState(fieldName)?.value as string | undefined;

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
    <Field name={field.properties.name}>
      {({ input }) => (
        <Stack>
          <Text>{field.prompt}</Text>
          <RadioGroup {...input} {...(field.properties as RadioGroupProperties)} />
        </Stack>
      )}
    </Field>
  );

  const renderTextInput = (field: FormField) => (
    <Field name={field.properties.name}>
      {({ input }) => (
        <Stack>
          <Text>{field.prompt}</Text>
          <TextInput {...input} {...(field.properties as TextInputProperties)} />
        </Stack>
      )}
    </Field>
  );

  const generateField = (field: FormField) => {
    switch (field.type) {
      case SupportedFormField.LinkButton: {
        return (
          <Fragment key={field.properties.name}>
            {renderLinkButton(field)}
            {generateWarnings(field)}
            {generateQuestion(undefined, field)}
          </Fragment>
        );
      }
      case SupportedFormField.RadioGroup: {
        return (
          <Fragment key={field.properties.name}>
            {renderRadioGroup(field)}
            {generateWarnings(field)}
            {generateQuestion(undefined, field)}
          </Fragment>
        );
      }
      case SupportedFormField.TextInput: {
        return (
          <Fragment key={field.properties.name}>
            {renderTextInput(field)}
            {generateWarnings(field)}
            {generateQuestion(undefined, field)}
          </Fragment>
        );
      }
    }
  };
  const generateQuestion = (field: FormField | undefined, subField: FormField | undefined): ReactElement | null => {
    //  GENERATE MAIN FIELD
    if (field) {
      return generateField(field);
    }

    // GENERATE VALUE-BASED SUBFIELDS
    if (subField) {
      const currentValue = getFieldValue(subField.properties.name);
      const childQuestions = QuestionFormUtilities.getChildQuestionsForParent(questions, subField.next, currentValue);

      return (
        <Box marginTop={4} borderTop="1px solid #d8d8d8">
          {childQuestions.map((q) => generateField(q.field))}
        </Box>
      );
    }
    return null;
  };

  return generateQuestion(field, undefined);
};
