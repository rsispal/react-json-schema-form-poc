/* Libraries */
import { FC, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

/* Components */
import { QuestionForm } from "../../components/QuestionForm/rc-field-form";

/* Constants */
// import SeedQuestions from "../../__SEED__/basic.json";
import SeedQuestions from "../../__SEED__/testbed.json";

/* Layouts */
import { PageLayout } from "../../layout/page/Page.layout";

/* Types */
import { QuestionSchema } from "../../components/QuestionForm/rc-field-form/QuestionForm.types";
import { TestBedPageProps } from "./TestBed.types";
import { BackOfficeQuestionResults } from "../../components/BackOfficeQuestionResults";

export const TestBedPage: FC<TestBedPageProps> = () => {
  const [submission, setSubmission] =
    useState<Record<string, string | undefined>>();

  const handleFormSubmit = (results: Record<string, string | undefined>) =>
    setSubmission(results);

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
    >
      <QuestionForm
        {...(SeedQuestions as unknown as QuestionSchema)}
        onSubmitCallback={handleFormSubmit}
        renderQuestion={(children) => (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="xl"
            padding={6}
            margin={6}
          >
            {children}
          </Box>
        )}
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
