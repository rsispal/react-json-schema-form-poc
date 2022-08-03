import { FC } from "react";
import { useField } from "formik";
import { LinkButton } from "../../../../fields/LinkButton";
import { QuestionFieldRenderProps } from "../../QuestionField/QuestionField.types";
import { LinkButtonProperties } from "../../QuestionForm.types";
import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";

export const LinkButtonFieldWrapper: FC<
  QuestionFieldRenderProps<LinkButtonProperties>
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
      <LinkButton
        {...question.properties}
        onClickCallback={handleClick}
        dataTestId={`${question.name}-link-button`}
      />
    </Stack>
  );
};
