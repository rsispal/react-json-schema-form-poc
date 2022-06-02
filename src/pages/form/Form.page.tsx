/* Libraries */
import { FC, ReactElement, useState } from "react";
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
