import { Stack, Flex, Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import {
  ButtonGroupProperties,
  LinkButtonProperties,
  NextQuestionButtonProperties,
  Question,
  SchemaDrivenQuestionFieldWrapperProps,
  SubmitButtonProperties,
  SupportedFormField,
} from "components/QuestionForm/formik-v2/types";
import { FC } from "react";
import LinkButtonFieldWrapper from "../LinkButton";
import NextQuestionButtonFieldWrapper from "../NextQuestionButton";
import SubmitButtonFieldWrapper from "../SubmitButton";

export const ButtonGroupFieldWrapper: FC<SchemaDrivenQuestionFieldWrapperProps<ButtonGroupProperties>> = ({
  question,
  onEndFormCallback,
  onAnswerCallback,
}) => {
  return (
    <Stack data-testid={`${question.id}-button-group`}>
      <Text data-testid={`${question.id}-question-prompt-text`} fontWeight={600} fontSize="larger">
        {question.prompt}
      </Text>
      {question.description && <DynamicText data={question.description} />}
      <Flex
        flex={1}
        width={"100%"}
        flexDirection="row"
        alignItems={"space-evenly"}
        justifyContent={"space-evenly"}
        flexWrap="wrap">
        {question.properties.buttons.map((btn, i) => {
          switch (btn.type) {
            case SupportedFormField.LinkButton: {
              return (
                <LinkButtonFieldWrapper
                  key={i}
                  question={btn as Question<LinkButtonProperties>}
                  value={undefined}
                  onEndFormCallback={onEndFormCallback}
                  onAnswerCallback={onAnswerCallback}
                />
              );
            }
            case SupportedFormField.NextQuestionButton: {
              return (
                <NextQuestionButtonFieldWrapper
                  key={i}
                  question={btn as Question<NextQuestionButtonProperties>}
                  value={undefined}
                  onEndFormCallback={onEndFormCallback}
                  onAnswerCallback={onAnswerCallback}
                />
              );
            }
            case SupportedFormField.SubmitButton: {
              return (
                <SubmitButtonFieldWrapper
                  key={i}
                  question={btn as Question<SubmitButtonProperties>}
                  value={undefined}
                  onEndFormCallback={onEndFormCallback}
                  onAnswerCallback={onAnswerCallback}
                />
              );
            }
            default: {
              return null;
            }
          }
        })}
      </Flex>
    </Stack>
  );
};
