/* Libraries */
import { FC, ReactElement, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

/* Components */
import {
  QuestionForm as QuestionFormRCFieldForm,
  QuestionFormUtilities as QuestionFormUtilitiesRCFieldForm,
} from "../../components/QuestionForm/rc-field-form";
import {
  QuestionForm as QuestionFormFormik,
  QuestionFormUtilities as QuestionFormUtilitiesFormik,
} from "../../components/QuestionForm/formik";

import { ButtonGroupFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/ButtonGroup";
import { LinkButtonFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/LinkButton";
import { NextQuestionButtonFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/NextQuestionButton";
import { PromptFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/Prompt";
import { RadioGroupFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/RadioGroup";
import { SubmitButtonFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/SubmitButton";
import { TextInputFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/TextInput";
import { WarningFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/Warning";
import { BackOfficeQuestionResults } from "../../components/BackOfficeQuestionResults";

/* Constants */
import SeedQuestions from "../../__SEED__/risk_questions.json";
import { Routes } from "../../constants";

/* Layouts */
import { PageLayout } from "../../layout/page/Page.layout";

/* Types */
import { QuestionSchema as QuestionSchemaFormik } from "../../components/QuestionForm/formik/QuestionForm.types";
import { QuestionSchema as QuestionSchemaRCFieldForm } from "../../components/QuestionForm/rc-field-form/QuestionForm.types";
import { FormPageProps } from "./Form.types";

export const FormPage: FC<FormPageProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant } = useParams(); // will use for Formik variant

  const [submission, setSubmission] =
    useState<Record<string, string | undefined>>();

  const [changedValues, setChangedValues] =
    useState<Record<string, string | undefined>>();

  const handleFormSubmit = (results: Record<string, string | undefined>) =>
    setSubmission(results);

  const renderQuestionField = (children: ReactElement) => (
    <Box
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      padding={6}
      margin={6}
    >
      {children}
    </Box>
  );

  const renderFormikVariant = () => (
    <QuestionFormFormik
      {...(SeedQuestions as unknown as QuestionSchemaFormik)}
      onEndFormClickCallback={() => undefined}
      onSubmitCallback={handleFormSubmit}
      onChangeCallback={(values) => setChangedValues(values)}
      renderQuestion={renderQuestionField}
      renderLinkButtonField={(props) => <LinkButtonFieldWrapper {...props} />}
      renderRadioGroupField={(props) => <RadioGroupFieldWrapper {...props} />}
      renderTextInputField={(props) => <TextInputFieldWrapper {...props} />}
      renderNextQuestionButtonField={(props) => (
        <NextQuestionButtonFieldWrapper {...props} />
      )}
      renderButtonGroupField={(props) => <ButtonGroupFieldWrapper {...props} />}
      renderPromptField={(props) => <PromptFieldWrapper {...props} />}
      renderWarningField={(props) => <WarningFieldWrapper {...props} />}
      renderFieldErrorMessage={(error) => (
        <Text color="red">{error.message}</Text>
      )}
      renderSubmitButtonField={(props) => (
        <SubmitButtonFieldWrapper {...props} />
      )}
    />
  );

  const renderRCFieldFormVariant = () => (
    <QuestionFormRCFieldForm
      {...(SeedQuestions as unknown as QuestionSchemaRCFieldForm)}
      onEndFormClickCallback={() => undefined}
      onSubmitCallback={handleFormSubmit}
      onChangeCallback={(values) => setChangedValues(values)}
      renderQuestion={renderQuestionField}
      renderLinkButtonField={(props) => <LinkButtonFieldWrapper {...props} />}
      renderRadioGroupField={(props) => <RadioGroupFieldWrapper {...props} />}
      renderTextInputField={(props) => <TextInputFieldWrapper {...props} />}
      renderNextQuestionButtonField={(props) => (
        <NextQuestionButtonFieldWrapper {...props} />
      )}
      renderButtonGroupField={(props) => <ButtonGroupFieldWrapper {...props} />}
      renderPromptField={(props) => <PromptFieldWrapper {...props} />}
      renderWarningField={(props) => <WarningFieldWrapper {...props} />}
      renderFieldErrorMessage={(error) => (
        <Text color="red">{error.message}</Text>
      )}
      renderSubmitButtonField={(props) => (
        <SubmitButtonFieldWrapper {...props} />
      )}
    />
  );

  const renderBackOfficeAnswers = () => {
    if (submission) {
      if (variant === "formik") {
        const answers =
          QuestionFormUtilitiesFormik.transformAnswers(submission);

        return (
          <BackOfficeQuestionResults
            schema={SeedQuestions as QuestionSchemaRCFieldForm}
            answers={answers}
          />
        );
      }

      if (variant === "rc-field-form") {
        const answers =
          QuestionFormUtilitiesRCFieldForm.transformAnswers(submission);

        return (
          <BackOfficeQuestionResults
            schema={SeedQuestions as QuestionSchemaRCFieldForm}
            answers={answers}
          />
        );
      }
    }
  };
  return (
    <PageLayout
      title="Form"
      badge={{
        children: "Work-in-progress",
        colorScheme: "purple",
        ml: "1",
        fontSize: "0.5em",
        marginLeft: 2,
      }}
      goBackRoute={Routes.ROUTE__HOME}
    >
      {(variant === "formik" && renderFormikVariant()) || <></>}
      {(variant === "rc-field-form" && renderRCFieldFormVariant()) || <></>}
      <Box paddingTop={20}>
        <Heading>BackOffice Results Preview</Heading>
        {renderBackOfficeAnswers()}
        <pre>{JSON.stringify(submission ?? changedValues, null, 2)}</pre>
      </Box>
      <Box paddingTop={20}>
        <Heading>Schema</Heading>
        <pre>{JSON.stringify(SeedQuestions, null, 2)}</pre>
      </Box>
    </PageLayout>
  );
};
