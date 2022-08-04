/* Libraries */
import { FC, ReactElement, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

/* Components */
import {
  QuestionForm,
  QuestionFormUtilities,
} from "../../components/QuestionForm/formik";

/* Constants */
import SeedQuestions from "../../__SEED__/basic.json";
// import SeedQuestions from "../../__SEED__/testbed.json";

/* Layouts */
import { PageLayout } from "../../layout/page/Page.layout";

/* Types */
import { QuestionSchema } from "../../components/QuestionForm/formik/QuestionForm.types";
import { TestBedPageProps } from "./TestBed.types";
import { BackOfficeQuestionResults } from "../../components/BackOfficeQuestionResults";
import { Routes } from "../../constants";

import { ButtonGroupFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/ButtonGroup";
import { LinkButtonFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/LinkButton";
import { NextQuestionButtonFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/NextQuestionButton";
import { PromptFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/Prompt";
import { RadioGroupFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/RadioGroup";
import { SubmitButtonFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/SubmitButton";
import { TextInputFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/TextInput";
import { WarningFieldWrapper } from "../../components/QuestionForm/formik/field-wrappers/Warning";

export const TestBedPage: FC<TestBedPageProps> = () => {
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

  const renderBackOfficeAnswers = () => {
    if (submission) {
      const answers = QuestionFormUtilities.transformAnswers(submission);
      console.log(answers);
      return (
        <BackOfficeQuestionResults
          schema={SeedQuestions as QuestionSchema}
          answers={answers}
        />
      );
    }
  };
  return (
    <PageLayout
      title="Testbed"
      badge={{
        children: "DEVELOPER USE ONLY",
        colorScheme: "red",
        ml: "1",
        fontSize: "0.5em",
        marginLeft: 2,
      }}
      goBackRoute={Routes.ROUTE__HOME}
    >
      <QuestionForm
        {...(SeedQuestions as unknown as QuestionSchema)}
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
        renderButtonGroupField={(props) => (
          <ButtonGroupFieldWrapper {...props} />
        )}
        renderPromptField={(props) => <PromptFieldWrapper {...props} />}
        renderWarningField={(props) => <WarningFieldWrapper {...props} />}
        renderFieldErrorMessage={(error) => (
          <Text color="red">{error.message}</Text>
        )}
        renderSubmitButtonField={(props) => (
          <SubmitButtonFieldWrapper {...props} />
        )}
      />
      <Box paddingTop={20}>
        <Heading>BackOffice Results Preview</Heading>
        {renderBackOfficeAnswers()}

        <br />
        <p>onChange Results:</p>
        <pre>{JSON.stringify(changedValues, null, 2)}</pre>
      </Box>
      <Box paddingTop={20}>
        <Heading>Schema</Heading>
        <pre>{JSON.stringify(SeedQuestions, null, 2)}</pre>
      </Box>
    </PageLayout>
  );
};
