import { FC } from "react";
import { useField } from "formik";
import { Prompt } from "../../../../fields/Prompt";
import { QuestionFieldRenderProps } from "../../QuestionField/QuestionField.types";
import { PromptProperties } from "../../QuestionForm.types";
import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";

export const PromptFieldWrapper: FC<
  QuestionFieldRenderProps<PromptProperties>
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
      <Prompt
        onContinueClick={handleClick}
        onEndFormClick={onEndFormClickCallback}
        {...question.properties}
        dataTestId={`${question.name}-prompt`}
      />
    </Stack>
  );
};
