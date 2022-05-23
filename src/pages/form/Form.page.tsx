/* Libraries */
import { FC, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

/* Components */
import { QuestionForm as QuestionFormRCFieldForm } from "../../components/QuestionForm/rc-field-form";
import { QuestionForm as QuestionFormReactFinalForm } from "../../components/QuestionForm/react-final-form";

/* Constants */
import SeedQuestions from "../../__SEED__/risk_questions.json";

/* Layouts */
import { PageLayout } from "../../layout/page/Page.layout";

/* Types */
import { QuestionSchema as QuestionSchemaRCFieldForm } from "../../components/QuestionForm/rc-field-form/QuestionForm.types";
import { QuestionSchema as QuestionSchemaReactFinalForm } from "../../components/QuestionForm/react-final-form/QuestionForm.types";
import { FormPageProps } from "./Form.types";
import { useParams } from "react-router-dom";

export const FormPage: FC<FormPageProps> = () => {
  const { variant } = useParams();

  const [submission, setSubmission] = useState<Record<string, string | undefined>>();

  const handleFormSubmit = (results: Record<string, string | undefined>) => setSubmission(results);

  const renderRCFieldFormVariant = () => (
    <QuestionFormRCFieldForm
      {...(SeedQuestions as QuestionSchemaRCFieldForm)}
      onSubmitCallback={handleFormSubmit}
      renderQuestion={(children) => (
        <Box borderWidth="1px" borderRadius="lg" boxShadow="xl" padding={6} margin={6}>
          {children}
        </Box>
      )}
    />
  );

  const renderReactFinalFormVariant = () => (
    <QuestionFormReactFinalForm
      {...(SeedQuestions as QuestionSchemaReactFinalForm)}
      onSubmitCallback={handleFormSubmit}
      renderQuestion={(children) => (
        <Box borderWidth="1px" borderRadius="lg" boxShadow="xl" padding={6} margin={6}>
          {children}
        </Box>
      )}
    />
  );

  const determineFormToRender = () => {
    switch (variant) {
      case "react-final-form": {
        return renderReactFinalFormVariant();
      }
      case "rc-field-form": {
        return renderRCFieldFormVariant();
      }
    }
    return <></>;
  };

  return (
    <PageLayout
      title="Form"
      badge={{ children: "Work-in-progress", colorScheme: "purple", ml: "1", fontSize: "0.5em", marginLeft: 2 }}>
      {determineFormToRender()}
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
