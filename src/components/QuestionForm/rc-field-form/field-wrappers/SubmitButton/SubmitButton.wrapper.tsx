import { Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { SubmitButton } from "../../../../fields/SubmitButton";
import { Question, SubmitButtonProperties } from "../../QuestionForm.types";

export const SubmitButtonWrapper: FC<{
  question: Question<SubmitButtonProperties>;
}> = ({ question }) => (
  <Stack>
    <Text>{question.prompt}</Text>
    <SubmitButton {...question.properties} />
  </Stack>
);
