/* Libraries */
import { FC, ReactElement, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

/* Components */
import { QuestionForm } from "../../components/QuestionForm/rc-field-form";

/* Constants */
import SeedQuestions from "../../__SEED__/basic.json";
// import SeedQuestions from "../../__SEED__/testbed.json";

/* Layouts */
import { PageLayout } from "../../layout/page/Page.layout";

/* Types */
import { QuestionSchema } from "../../components/QuestionForm/rc-field-form/QuestionForm.types";
import { TestBedPageProps } from "./TestBed.types";
import { BackOfficeQuestionResults } from "../../components/BackOfficeQuestionResults";
import { Routes } from "../../constants";

import { ButtonGroupWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/ButtonGroup/ButtonGroup.wrapper";
import { LinkButtonWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/LinkButton/LinkButton.wrapper";
import { NextQuestionButtonWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/NextQuestionButton/NextQuestionButton.wrapper";
import { PromptWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/Prompt/Prompt.wrapper";
import { RadioGroupWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/RadioGroup/RadioGroup.wrapper";
import { SubmitButtonWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/SubmitButton/SubmitButton.wrapper";
import { TextInputWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/TextInput/TextInput.wrapper";
import { WarningWrapper } from "../../components/QuestionForm/rc-field-form/field-wrappers/Warning/Warning.wrapper";

export const TestBedPage: FC<TestBedPageProps> = () => {
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
        renderLinkButtonField={(props) => <LinkButtonWrapper {...props} />}
        renderRadioGroupField={(props) => <RadioGroupWrapper {...props} />}
        renderTextInputField={(props) => <TextInputWrapper {...props} />}
        renderNextQuestionButtonField={(props) => (
          <NextQuestionButtonWrapper {...props} />
        )}
        renderButtonGroupField={(props) => <ButtonGroupWrapper {...props} />}
        renderPromptField={(props) => <PromptWrapper {...props} />}
        renderWarningField={(props) => <WarningWrapper {...props} />}
        renderSubmitButtonField={(props) => <SubmitButtonWrapper {...props} />}
      />
      <Box paddingTop={20}>
        <Heading>BackOffice Results Preview</Heading>
        <BackOfficeQuestionResults
          schema={SeedQuestions as unknown as QuestionSchema}
          answers={submission}
        />

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
