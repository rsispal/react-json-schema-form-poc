import { Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { DynamicText } from "../../../../DynamicText";
import { SubmitButton } from "../../../../fields/SubmitButton";
import { Question, SubmitButtonProperties } from "../../QuestionForm.types";

export const SubmitButtonWrapper: FC<{
  question: Question<SubmitButtonProperties>;
}> = ({ question }) => (
  <Stack>
    =<Text fontWeight={600}>{question.prompt}</Text>
    {question.description && <DynamicText data={question.description} />}
    <SubmitButton {...question.properties} />
  </Stack>
);
