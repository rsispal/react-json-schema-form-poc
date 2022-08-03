import { FC } from "react";
import { SubmitButton } from "../../../../fields/SubmitButton";
import { QuestionFieldRenderProps } from "../../QuestionField/QuestionField.types";
import { SubmitButtonProperties } from "../../QuestionForm.types";
import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";

export const SubmitButtonFieldWrapper: FC<
  QuestionFieldRenderProps<SubmitButtonProperties>
> = ({ question, onEndFormClickCallback }) => (
  <Stack>
    <Text
      data-testid={`${question.name}-question-prompt-text`}
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
