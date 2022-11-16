import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import {
  SubmitButtonProperties,
  QuestionFieldWrapperProps,
} from "components/QuestionForm/formik-v2/types";
import { FC } from "react";
import SubmitButton from "../../fields/SubmitButton";

export const SubmitButtonFieldWrapper: FC<
  QuestionFieldWrapperProps<SubmitButtonProperties>
> = ({ question }) => {
  return (
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
};
