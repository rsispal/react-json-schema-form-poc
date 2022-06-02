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

export const TestBedPage: FC<TestBedPageProps> = () => {
  const [submission, setSubmission] =
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
        renderQuestion={renderQuestionField}
      />
      <Box paddingTop={20}>
        <Heading>BackOffice Results Preview</Heading>
        <BackOfficeQuestionResults
          schema={SeedQuestions as unknown as QuestionSchema}
          answers={submission}
        />

        <br />
        <p>onChange Results:</p>
        <pre>{JSON.stringify(submission, null, 2)}</pre>
      </Box>
      <Box paddingTop={20}>
        <Heading>Schema</Heading>
        <pre>{JSON.stringify(SeedQuestions, null, 2)}</pre>
      </Box>
    </PageLayout>
  );
};
