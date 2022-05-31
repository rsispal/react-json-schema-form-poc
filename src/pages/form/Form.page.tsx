/* Libraries */
import { FC, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

/* Components */
import { QuestionForm as QuestionFormRCFieldForm } from "../../components/QuestionForm/rc-field-form";

/* Constants */
import SeedQuestions from "../../__SEED__/risk_questions.json";

/* Layouts */
import { PageLayout } from "../../layout/page/Page.layout";

/* Types */
import { QuestionSchema as QuestionSchemaRCFieldForm } from "../../components/QuestionForm/rc-field-form/QuestionForm.types";
import { FormPageProps } from "./Form.types";
import { useParams } from "react-router-dom";
import { BackOfficeQuestionResults } from "../../components/BackOfficeQuestionResults";
import { Routes } from "../../constants";

export const FormPage: FC<FormPageProps> = () => {
  const { variant } = useParams();

  const [submission, setSubmission] =
    useState<Record<string, string | undefined>>();

  const handleFormSubmit = (results: Record<string, string | undefined>) =>
    setSubmission(results);

  const renderRCFieldFormVariant = () => (
    <QuestionFormRCFieldForm
      {...(SeedQuestions as unknown as QuestionSchemaRCFieldForm)}
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
  );

  const determineFormToRender = () => {
    switch (variant) {
      case "rc-field-form": {
        return renderRCFieldFormVariant();
      }
    }
    return <></>;
  };

  const determineBackOfficeResultsToRender = () => {
    switch (variant) {
      case "rc-field-form": {
        return (
          <BackOfficeQuestionResults
            schema={SeedQuestions as QuestionSchemaRCFieldForm}
            answers={submission}
          />
        );
      }
    }
    return <></>;
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
      {determineFormToRender()}
      <Box paddingTop={20}>
        <Heading>BackOffice Results Preview</Heading>

        {determineBackOfficeResultsToRender()}
        <pre>{JSON.stringify(submission, null, 2)}</pre>
      </Box>
      <Box paddingTop={20}>
        <Heading>Schema</Heading>
        <pre>{JSON.stringify(SeedQuestions, null, 2)}</pre>
      </Box>
    </PageLayout>
  );
};
