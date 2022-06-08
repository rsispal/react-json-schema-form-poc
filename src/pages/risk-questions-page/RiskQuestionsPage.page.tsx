/* Libraries */
import { FC, ReactElement, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

/* Components */
import { RiskQuestionForm } from "../../components/RiskQuestionForm/";
import { BackOfficeQuestionResults } from "../../components/BackOfficeQuestionResults";

/* Constants */
import SeedQuestions from "../../__SEED__/risk_questions.json";
import { Routes } from "../../constants";

/* Layouts */
import { PageLayout } from "../../layout/page/Page.layout";

/* Types */
import { QuestionSchema } from "../../components/QuestionForm/rc-field-form/QuestionForm.types";
import { RiskQuestionsPageProps } from "./RiskQuestionsPage.types";

export const RiskQuestionsPage: FC<RiskQuestionsPageProps> = () => {
  const [submission, setSubmission] =
    useState<Record<string, string | boolean | undefined>>();

  const handleFormSubmit = (
    results: Record<string, string | boolean | undefined>
  ) => {
    setSubmission(results);
  };

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
      title="Risk Questions"
      badge={{
        children: "Work-in-progress",
        colorScheme: "purple",
        ml: "1",
        fontSize: "0.5em",
        marginLeft: 2,
      }}
      goBackRoute={Routes.ROUTE__HOME}
    >
      <RiskQuestionForm
        schema={SeedQuestions as unknown as QuestionSchema}
        onEndFormCallback={() => undefined}
        onSubmitCallback={handleFormSubmit}
        renderQuestion={renderQuestionField}
      />
      <Box paddingTop={20}>
        <Heading>BackOffice Results Preview</Heading>

        <BackOfficeQuestionResults
          schema={SeedQuestions as QuestionSchema}
          answers={submission}
        />
      </Box>
      <Box paddingTop={20}>
        <Heading>Schema</Heading>
        <pre>{JSON.stringify(SeedQuestions, null, 2)}</pre>
      </Box>
    </PageLayout>
  );
};
