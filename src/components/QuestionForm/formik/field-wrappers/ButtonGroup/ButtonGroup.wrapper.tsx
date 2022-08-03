import { FC } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import {
  ButtonGroupProperties,
  LinkButtonProperties,
  NextQuestionButtonProperties,
  Question,
  SubmitButtonProperties,
  SupportedFormField,
} from "../../QuestionForm.types";
import { NextQuestionButtonFieldWrapper } from "../NextQuestionButton/NextQuestionButton.wrapper";
import { LinkButtonFieldWrapper } from "../LinkButton/LinkButton.wrapper";
import { SubmitButtonFieldWrapper } from "../SubmitButton/SubmitButton.wrapper";
import { DynamicText } from "../../../../DynamicText";
import { QuestionFieldRenderProps } from "../../QuestionField/QuestionField.types";

export const ButtonGroupFieldWrapper: FC<
  QuestionFieldRenderProps<ButtonGroupProperties>
> = ({ question }) => (
  <Stack data-testid={`${question.name}-button-group`}>
    <Text
      data-testid={`${question.name}-question-prompt-text`}
      fontWeight={600}
      fontSize="larger"
    >
      {question.prompt}
    </Text>
    {question.description && <DynamicText data={question.description} />}
    <Flex
      flex={1}
      width={"100%"}
      flexDirection="row"
      alignItems={"space-evenly"}
      justifyContent={"space-evenly"}
      flexWrap="wrap"
    >
      {question.properties.buttons.map((btn, i) => {
        switch (btn.type) {
          case SupportedFormField.LinkButton: {
            return (
              <LinkButtonFieldWrapper
                key={i}
                question={btn as Question<LinkButtonProperties>}
                onEndFormClickCallback={() => undefined}
              />
            );
          }
          case SupportedFormField.NextQuestionButton: {
            return (
              <NextQuestionButtonFieldWrapper
                key={i}
                question={btn as Question<NextQuestionButtonProperties>}
                onEndFormClickCallback={() => undefined}
              />
            );
          }
          case SupportedFormField.SubmitButton: {
            return (
              <SubmitButtonFieldWrapper
                key={i}
                question={btn as Question<SubmitButtonProperties>}
                onEndFormClickCallback={() => undefined}
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
