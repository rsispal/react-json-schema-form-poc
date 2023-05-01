import { Stack, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import {
  LinkButtonProperties,
  PreDefinedResponse,
  SchemaDrivenQuestionFieldWrapperProps,
} from "components/QuestionForm/formik-v2/types";
import { useField } from "formik";
import { FC } from "react";
import LinkButton from "../../fields/LinkButton";

export const LinkButtonFieldWrapper: FC<SchemaDrivenQuestionFieldWrapperProps<LinkButtonProperties>> = ({ question }) => {
  const [{ onChange }] = useField<string>({
    name: question.id,
  });

  const handleClick = () => onChange(question.id)(PreDefinedResponse.SELECTED);

  return (
    <Stack>
      <Text data-testid={`${question.id}-question-prompt-text`} fontWeight={600} fontSize="larger">
        {question.prompt}
      </Text>
      {question.description && <DynamicText data={question.description} />}
      <LinkButton
        onClickCallback={handleClick}
        dataTestId={`${question.id}-link-button`}
        label={question.properties.label}
        url={question.properties.url}
        target={question.properties.target}
      />
    </Stack>
  );
};
