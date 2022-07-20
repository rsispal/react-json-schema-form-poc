import { Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { DynamicText } from "../../../../DynamicText";
import { SubmitButton } from "../../../../fields/SubmitButton";
import { Question, SubmitButtonProperties } from "../../QuestionForm.types";

export const SubmitButtonWrapper: FC<{
  question: Question<SubmitButtonProperties>;
}> = ({ question }) => (
  <Stack>
    <Text
      data-testid={`${question.name}-prompt`}
      fontWeight={600}
      fontSize="larger"
    >
      {question.prompt}
    </Text>
    {question.description && <DynamicText data={question.description} />}
    <SubmitButton
      {...question.properties}
      dataTestId={`${question.name}-submit-button`}
    />
  </Stack>
);
