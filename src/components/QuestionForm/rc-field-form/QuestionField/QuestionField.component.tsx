import { FC, Fragment, ReactElement, useRef } from "react";
import { Alert, Button, Stack, Text } from "@chakra-ui/react";

import { Field } from "rc-field-form";

// import { LinkButton } from "../../../fields/LinkButton";
import { RadioGroup } from "../../../fields/RadioGroup";
import { TextInput } from "../../../fields/TextInput";
// TODO: Next Button

import {
  FormField,
  LinkButtonProperties,
  RadioGroupProperties,
  SupportedFormField,
  TextInputProperties,
  NextQuestionButtonProperties,
} from "../QuestionForm.types";
import { QuestionFieldProps } from "./QuestionField.types";
import { QuestionFormUtilities } from "../QuestionForm.utilities";

const LinkButtonWrapper: FC<{
  value: boolean;
  onChange: any;
  field: FormField;
}> = ({ value, onChange, field }) => {
  const handleClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  };

  const checkboxRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <a
        href={(field.properties as LinkButtonProperties).url}
        target={(field.properties as LinkButtonProperties).target}
        onClick={handleClick}
      >
        <Button onClick={handleClick} width={"fit-content"}>
          {(field.properties as LinkButtonProperties).url}
        </Button>
      </a>
      <input
        hidden
        name={field.properties.name}
        ref={checkboxRef}
        type="checkbox"
        defaultChecked={value}
        onChange={() => onChange(true)}
      />
    </>
  );
};

const RadioGroupWrapper: FC<{
  value: string | undefined;
  onChange: any;
  field: FormField;
}> = ({ value, onChange, field }) => (
  <RadioGroup
    {...(field.properties as RadioGroupProperties)}
    value={value}
    onChange={onChange}
  />
);

const TextInputWrapper: FC<{
  value: string | undefined;
  onChange: any;
  field: FormField;
}> = ({ value, onChange, field }) => (
  <TextInput
    {...(field.properties as TextInputProperties)}
    value={value}
    onChange={onChange}
  />
);

const NextQuestionButtonWrapper: FC<{
  value: boolean;
  onChange: any;
  field: FormField;
}> = ({ value, onChange, field }) => {
  const handleClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  };

  const checkboxRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button onClick={handleClick} width={"fit-content"}>
        {(field.properties as NextQuestionButtonProperties).label}
      </Button>
      <input
        hidden
        name={field.properties.name}
        ref={checkboxRef}
        type="checkbox"
        defaultChecked={value}
        onChange={() => onChange(true)}
      />
    </>
  );
};

export const QuestionField: FC<QuestionFieldProps> = ({
  questions,
  question,
  renderQuestion,
  values,
  form,
}) => {
  const { field } = question;

  const getFieldValue = (fieldName: string) =>
    values[fieldName] as string | undefined; //form.getFieldState(fieldName)?.value as string | undefined;
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
    const applicableWarnings = QuestionFormUtilities.getWarningsForField(
      field.warnings,
      currentValue
    );
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

  // const renderLinkButton = (field: FormField) => (
  //   <>
  //     <Text>{field.prompt}</Text>
  //     <LinkButton {...(field.properties as LinkButtonProperties)} />
  //   </>
  // );

  const renderLinkButton = (field: FormField) => (
    <Stack>
      <Text>{field.prompt}</Text>
      <Field name={field.properties.name}>
        {({ value, onChange }) => (
          <LinkButtonWrapper value={value} onChange={onChange} field={field} />
        )}
      </Field>
    </Stack>
  );
  const renderRadioGroup = (field: FormField) => (
    <Stack>
      <Text>{field.prompt}</Text>
      <Field name={field.properties.name} rules={field.validation}>
        {({ value, onChange }) => (
          <RadioGroupWrapper value={value} onChange={onChange} field={field} />
        )}
      </Field>
    </Stack>
  );

  const renderTextInput = (field: FormField) => (
    <Stack>
      <Text>{field.prompt}</Text>
      <Field name={field.properties.name}>
        {({ value, onChange }) => (
          <TextInputWrapper value={value} onChange={onChange} field={field} />
        )}
      </Field>
    </Stack>
  );

  const renderNextQuestionButton = (field: FormField) => (
    <Stack>
      <Text>{field.prompt}</Text>
      <Field name={field.properties.name}>
        {({ value, onChange }) => (
          <NextQuestionButtonWrapper
            value={value}
            onChange={onChange}
            field={field}
          />
        )}
      </Field>
    </Stack>
  );

  const generateField = (field: FormField, key?: number) => {
    switch (field.type) {
      case SupportedFormField.LinkButton: {
        const doesFieldHaveError =
          getFieldError(field.properties.name).length > 0;

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
        const doesFieldHaveError =
          getFieldError(field.properties.name).length > 0;

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
        const doesFieldHaveError =
          getFieldError(field.properties.name).length > 0;

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
      case SupportedFormField.NextQuestionButton: {
        const doesFieldHaveError =
          getFieldError(field.properties.name).length > 0;
        return (
          <Fragment key={field.properties.name}>
            {renderQuestion(
              <Fragment>
                {generateError(field.properties.name)}
                {renderNextQuestionButton(field)}
                {generateWarnings(field)}
              </Fragment>
            )}
            {!doesFieldHaveError && generateQuestion(undefined, field)}
          </Fragment>
        );
      }
      case SupportedFormField.ButtonGroup: {
        return (
          <>
            <p>Under Construction</p>
          </>
        );
      }
      default: {
        return null;
      }
    }
  };
  const generateQuestion = (
    field: FormField | undefined,
    subField: FormField | undefined
  ): ReactElement | null => {
    //  GENERATE MAIN FIELD
    if (field) {
      return generateField(field);
    }

    // GENERATE VALUE-BASED SUBFIELDS
    if (subField) {
      const currentValue = getFieldValue(subField.properties.name);

      const childQuestions = QuestionFormUtilities.getChildQuestionsForParent(
        questions,
        subField.next,
        currentValue
      );

      return <>{childQuestions.map((q) => generateField(q.field))}</>;
    }
    return null;
  };

  return generateQuestion(field, undefined);
};
