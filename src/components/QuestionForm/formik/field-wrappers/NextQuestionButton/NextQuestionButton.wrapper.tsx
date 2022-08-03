import { FC } from "react";
import { useField } from "formik";
import { NextQuestionButton } from "../../../../fields/NextQuestionButton";
import { QuestionFieldRenderProps } from "../../QuestionField/QuestionField.types";
import { NextQuestionButtonProperties } from "../../QuestionForm.types";
import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";

export const NextQuestionButtonFieldWrapper: FC<
  QuestionFieldRenderProps<NextQuestionButtonProperties>
> = ({ question, onEndFormClickCallback }) => {
  const [{ onChange }] = useField<string>({
    name: question.name,
  });

  const handleClick = () => onChange(question.name)("SELECTED");

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
      <NextQuestionButton
        {...question.properties}
        onClickCallback={handleClick}
        dataTestId={`${question.name}-next-question-button`}
      />
    </Stack>
  );
};
