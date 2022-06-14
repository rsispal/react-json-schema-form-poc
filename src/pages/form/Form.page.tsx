/* Libraries */
import { FC, ReactElement, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

/* Components */
import { QuestionForm as QuestionFormRCFieldForm } from "../../components/QuestionForm/rc-field-form";
import { ButtonGroupWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/ButtonGroup/ButtonGroup.wrapper";
import { LinkButtonWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/LinkButton/LinkButton.wrapper";
import { NextQuestionButtonWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/NextQuestionButton/NextQuestionButton.wrapper";
import { PromptWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/Prompt/Prompt.wrapper";
import { RadioGroupWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/RadioGroup/RadioGroup.wrapper";
import { SubmitButtonWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/SubmitButton/SubmitButton.wrapper";
import { TextInputWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/TextInput/TextInput.wrapper";
import { WarningWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/Warning/Warning.wrapper";
import { BackOfficeQuestionResults } from "../../components/BackOfficeQuestionResults";

/* Constants */
import SeedQuestions from "../../__SEED__/risk_questions.json";
import { Routes } from "../../constants";

/* Layouts */
import { PageLayout } from "../../layout/page/Page.layout";

/* Types */
import { QuestionSchema as QuestionSchemaRCFieldForm } from "../../components/QuestionForm/rc-field-form/QuestionForm.types";
import { FormPageProps } from "./Form.types";

export const FormPage: FC<FormPageProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant } = useParams(); // will use for Formik variant

  const [submission, setSubmission] =
    useState<Record<string, string | boolean | undefined>>();

  const [changedValues, setChangedValues] =
    useState<Record<string, string | boolean | undefined>>();

  const handleFormSubmit = (
    results: Record<string, string | boolean | undefined>
  ) => setSubmission(results);

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
      <QuestionFormRCFieldForm
        {...(SeedQuestions as unknown as QuestionSchemaRCFieldForm)}
        onEndFormClickCallback={() => undefined}
        onSubmitCallback={handleFormSubmit}
        onChangeCallback={(values) => setChangedValues(values)}
        renderQuestion={renderQuestionField}
        renderLinkButtonField={(props) => <LinkButtonWrapper {...props} />}
        renderRadioGroupField={(props) => <RadioGroupWrapper {...props} />}
        renderTextInputField={(props) => <TextInputWrapper {...props} />}
        renderNextQuestionButtonField={(props) => (
          <NextQuestionButtonWrapper {...props} />
        )}
        renderButtonGroupField={(props) => <ButtonGroupWrapper {...props} />}
        renderPromptField={(props) => <PromptWrapper {...props} />}
        renderWarningField={(props) => <WarningWrapper {...props} />}
        renderFieldErrorMessage={(error) => (
          <Text color="red">{error.message}</Text>
        )}
        renderSubmitButtonField={(props) => <SubmitButtonWrapper {...props} />}
      />
      <Box paddingTop={20}>
        <Heading>BackOffice Results Preview</Heading>

        <BackOfficeQuestionResults
          schema={SeedQuestions as QuestionSchemaRCFieldForm}
          answers={submission}
        />
        <pre>{JSON.stringify(submission ?? changedValues, null, 2)}</pre>
      </Box>
      <Box paddingTop={20}>
        <Heading>Schema</Heading>
        <pre>{JSON.stringify(SeedQuestions, null, 2)}</pre>
      </Box>
    </PageLayout>
  );
};
