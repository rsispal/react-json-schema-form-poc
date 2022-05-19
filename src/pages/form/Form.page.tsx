/* Libraries */
import { FC, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

/* Components */
import { QuestionForm } from "../../components/QuestionForm";

/* Constants */
import SeedQuestions from "../../__SEED__/risk_questions.json";

/* Layouts */
import { PageLayout } from "../../layout/page/Page.layout";

/* Types */
import { Question } from "../../components/QuestionForm/QuestionForm.types";
import { FormPageProps } from "./Form.types";

export const FormPage: FC<FormPageProps> = () => {
  const [submission, setSubmission] = useState<Record<string, string | undefined>>();

  const handleFormSubmit = (results: Record<string, string | undefined>) => setSubmission(results);

  return (
    <PageLayout
      title="Form"
      badge={{ children: "Work-in-progress", colorScheme: "purple", ml: "1", fontSize: "0.5em", marginLeft: 2 }}>
      <QuestionForm
        questions={SeedQuestions as Question[]}
        onSubmitCallback={handleFormSubmit}
        renderQuestion={(children) => (
          <Box borderWidth="1px" borderRadius="lg" boxShadow="xl">
            {children}
          </Box>
        )}
      />
      <Box paddingTop={20}>
        <Heading>BackOffice Results Preview</Heading>
        <Text>Visualiser under development</Text>
        <pre>{JSON.stringify(submission, null, 2)}</pre>
      </Box>
      <Box paddingTop={20}>
        <Heading>Schema</Heading>
        <pre>{JSON.stringify(SeedQuestions, null, 2)}</pre>
      </Box>
    </PageLayout>
  );
};
