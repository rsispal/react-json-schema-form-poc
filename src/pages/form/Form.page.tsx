import { FC } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { QuestionForm } from "../../components/QuestionForm";
import { FormPageProps } from "./Form.types";

import SeedQuestions from "../../__SEED__/data.json";
import { Question } from "../../components/QuestionForm/QuestionForm.types";

export const FormPage: FC<FormPageProps> = () => (
  <Box w="100vw" h="100vh">
    <Heading>Form Page</Heading>

    <QuestionForm questions={SeedQuestions as Question[]} />
  </Box>
);
